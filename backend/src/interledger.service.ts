import {
  AuthenticatedClient,
  createAuthenticatedClient,
  Grant,
  isFinalizedGrant,
  isPendingGrant,
  OpenPaymentsClientError,
  PendingGrant,
  Quote,
  WalletAddress,
} from '@interledger/open-payments';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import * as fs from 'fs';

export type OutgoingPaymentGrantCache = {
  outgoingPaymentGrant: PendingGrant | Grant;
  sendingWalletAddress: WalletAddress;
  receivingWalletAddress: WalletAddress;
  quote: Quote;
};

export type PaymentParams = {
  receiverWalletAddressUrl: string;
  senderWalletAddressUrl: string;
  amount: number;
};

export type PaymentResponse = {
  status: 'pending' | 'success';
  interactUrl?: string;
  accessToken?: string;
  quote?: Quote;
};

@Injectable()
export class InterledgerService implements OnModuleInit {
  private outgoingPaymentCache: Map<string, OutgoingPaymentGrantCache> =
    new Map();

  private client: AuthenticatedClient;

  async onModuleInit() {
    await this.init();
  }

  async init() {
    const PRIVATE_KEY_PATH = fs.readFileSync('private.key', 'utf-8');

    if (!PRIVATE_KEY_PATH) {
      console.error('PRIVATE_KEY_PATH is not defined');
      throw new InternalServerErrorException();
    }

    const KEY_ID = process.env.WALLET_KEY_ID;

    if (!KEY_ID) {
      console.error('KEY_ID is not defined');
      throw new InternalServerErrorException();
    }

    const CLIENT_WALLET_ADDRESS_URL = process.env.CLIENT_WALLET_ADDRESS_URL;

    if (!CLIENT_WALLET_ADDRESS_URL) {
      console.error('CLIENT_WALLET_ADDRESS_URL is not defined');
      throw new InternalServerErrorException();
    }

    this.client = await createAuthenticatedClient({
      walletAddressUrl: CLIENT_WALLET_ADDRESS_URL,
      keyId: KEY_ID,
      privateKey: PRIVATE_KEY_PATH,
    });
  }

  async executePayment(params: PaymentParams): Promise<PaymentResponse> {
    const { receiverWalletAddressUrl, senderWalletAddressUrl, amount } = params;

    const sendingWalletAddress = await this.client.walletAddress.get({
      url: senderWalletAddressUrl,
    });
    const receivingWalletAddress = await this.client.walletAddress.get({
      url: receiverWalletAddressUrl,
    });

    const incomingPaymentGrant = await this.client.grant.request(
      {
        url: receivingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: 'incoming-payment',
              actions: ['read', 'complete', 'create'],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(incomingPaymentGrant)) {
      console.error('No se pudo obtener el incoming payment grant');
      throw new InternalServerErrorException('Error al realizar el pago');
    }

    const incomingPayment = await this.client.incomingPayment.create(
      {
        url: receivingWalletAddress.resourceServer,
        accessToken: incomingPaymentGrant.access_token.value,
      },
      {
        walletAddress: receivingWalletAddress.id,
        incomingAmount: {
          assetCode: receivingWalletAddress.assetCode,
          assetScale: receivingWalletAddress.assetScale,
          value: amount.toString(),
        },
      },
    );

    const quoteGrant = await this.client.grant.request(
      {
        url: sendingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: 'quote',
              actions: ['create', 'read'],
            },
          ],
        },
      },
    );

    if (!isFinalizedGrant(quoteGrant)) {
      console.error('No se pudo obtener el quote');
      throw new InternalServerErrorException('Error al realizar el pago');
    }

    const quote = await this.client.quote.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: quoteGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        receiver: incomingPayment.id,
        method: 'ilp',
      },
    );

    const outgoingPaymentGrant = await this.client.grant.request(
      {
        url: sendingWalletAddress.authServer,
      },
      {
        access_token: {
          access: [
            {
              type: 'outgoing-payment',
              actions: ['read', 'create'],
              limits: {
                debitAmount: {
                  assetCode: quote.debitAmount.assetCode,
                  assetScale: quote.debitAmount.assetScale,
                  value: quote.debitAmount.value,
                },
              },
              identifier: sendingWalletAddress.id,
            },
          ],
        },
        interact: {
          start: ['redirect'],
        },
      },
    );

    if (isPendingGrant(outgoingPaymentGrant)) {
      this.outgoingPaymentCache.set(
        outgoingPaymentGrant.continue.access_token.value,
        {
          outgoingPaymentGrant,
          sendingWalletAddress,
          receivingWalletAddress,
          quote,
        },
      );

      return {
        status: 'pending',
        interactUrl: (outgoingPaymentGrant as PendingGrant).interact.redirect,
        accessToken: outgoingPaymentGrant.continue.access_token.value,
      };
    }

    return this.continueGrant({
      outgoingPaymentGrant,
      sendingWalletAddress,
      receivingWalletAddress,
      quote,
    });
  }

  async continueGrant(
    outgoingPaymentGrantOrAccessToken?: OutgoingPaymentGrantCache | string,
  ): Promise<PaymentResponse> {
    if (!outgoingPaymentGrantOrAccessToken) {
      throw new BadRequestException(
        'No se ha proporcionado un token del pago o la continuación del pago',
      );
    }

    let outgoingPaymentGrantItem: OutgoingPaymentGrantCache;

    if (typeof outgoingPaymentGrantOrAccessToken === 'string') {
      const outgoingPaymentGrantCached = this.outgoingPaymentCache.get(
        outgoingPaymentGrantOrAccessToken,
      );

      if (!outgoingPaymentGrantCached) {
        throw new BadRequestException('No se ha encontrado el token del pago');
      }

      outgoingPaymentGrantItem = outgoingPaymentGrantCached;
    } else {
      outgoingPaymentGrantItem = outgoingPaymentGrantOrAccessToken;
    }

    const { outgoingPaymentGrant, sendingWalletAddress, quote } =
      outgoingPaymentGrantItem;

    let finalizedOutgoingPaymentGrant;

    try {
      finalizedOutgoingPaymentGrant = await this.client.grant.continue({
        url: outgoingPaymentGrant.continue.uri,
        accessToken: outgoingPaymentGrant.continue.access_token.value,
      });
    } catch (err) {
      if (err instanceof OpenPaymentsClientError) {
        console.log(
          '\nThere was an error continuing the grant. You probably have not accepted the grant at the url (or it has already been used up, in which case, rerun the script).',
        );
      }

      throw new InternalServerErrorException(err);
    }

    if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
      console.log(
        'There was an error continuing the grant. You probably have not accepted the grant at the url.',
      );
      throw new InternalServerErrorException();
    }

    await this.client.outgoingPayment.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: finalizedOutgoingPaymentGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        quoteId: quote.id,
      },
    );

    this.outgoingPaymentCache.delete(
      finalizedOutgoingPaymentGrant.access_token.value,
    );

    return {
      status: 'success',
      quote,
    };
  }
}
