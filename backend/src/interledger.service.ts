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

  async executePayment(
    receivingWalletAddressUrl: string,
    sendingWalletAddressUrl: string,
  ) {
    // Step 1: Get the sending and receiving wallet addresses
    const sendingWalletAddress = await this.client.walletAddress.get({
      url: sendingWalletAddressUrl,
    });
    const receivingWalletAddress = await this.client.walletAddress.get({
      url: receivingWalletAddressUrl,
    });

    console.log('\nStep 1: got wallet addresses', {
      receivingWalletAddress,
      sendingWalletAddress,
    });

    // Step 2: Get a grant for the incoming payment, so we can create the incoming payment on the receiving wallet address
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

    console.log(
      '\nStep 2: got incoming payment grant for receiving wallet address',
      incomingPaymentGrant,
    );

    if (!isFinalizedGrant(incomingPaymentGrant)) {
      throw new Error('Expected finalized incoming payment grant');
    }

    // Step 3: Create the incoming payment. This will be where funds will be received.
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
          value: '1000',
        },
      },
    );

    console.log(
      '\nStep 3: created incoming payment on receiving wallet address',
      incomingPayment,
    );

    // Step 4: Get a quote grant, so we can create a quote on the sending wallet address
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
      throw new Error('Expected finalized quote grant');
    }

    console.log(
      '\nStep 4: got quote grant on sending wallet address',
      quoteGrant,
    );

    // Step 5: Create a quote, this gives an indication of how much it will cost to pay into the incoming payment
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

    console.log('\nStep 5: got quote on sending wallet address', quote);

    // Step 7: Start the grant process for the outgoing payments.
    // This is an interactive grant: the user (in this case, you) will need to accept the grant by navigating to the outputted link.
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
          // finish: {
          //   method: "redirect",
          //   // This is where you can (optionally) redirect a user to after going through interaction.
          //   // Keep in mind, you will need to parse the interact_ref in the resulting interaction URL,
          //   // and pass it into the grant continuation request.
          //   uri: "https://example.com",
          //   nonce: crypto.randomUUID(),
          // },
        },
      },
    );

    console.log(
      '\nStep 7: got pending outgoing payment grant',
      outgoingPaymentGrant,
    );
    console.log(
      'Please navigate to the following URL, to accept the interaction from the sending wallet:',
    );
    console.log((outgoingPaymentGrant as PendingGrant).interact.redirect);

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
  ) {
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

    const {
      outgoingPaymentGrant,
      sendingWalletAddress,
      receivingWalletAddress,
      quote,
    } = outgoingPaymentGrantItem;

    let finalizedOutgoingPaymentGrant;

    const grantContinuationErrorMessage =
      '\nThere was an error continuing the grant. You probably have not accepted the grant at the url (or it has already been used up, in which case, rerun the script).';

    try {
      finalizedOutgoingPaymentGrant = await this.client.grant.continue({
        url: outgoingPaymentGrant.continue.uri,
        accessToken: outgoingPaymentGrant.continue.access_token.value,
      });
    } catch (err) {
      if (err instanceof OpenPaymentsClientError) {
        console.log(grantContinuationErrorMessage);
      }

      throw new InternalServerErrorException(err);
    }

    if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
      console.log(
        'There was an error continuing the grant. You probably have not accepted the grant at the url.',
      );
      throw new InternalServerErrorException();
    }

    console.log(
      '\nStep 6: got finalized outgoing payment grant',
      finalizedOutgoingPaymentGrant,
    );

    // Step 7: Finally, create the outgoing payment on the sending wallet address.
    // This will make a payment from the outgoing payment to the incoming one (over ILP)
    const outgoingPayment = await this.client.outgoingPayment.create(
      {
        url: sendingWalletAddress.resourceServer,
        accessToken: finalizedOutgoingPaymentGrant.access_token.value,
      },
      {
        walletAddress: sendingWalletAddress.id,
        quoteId: quote.id,
      },
    );

    console.log(
      '\nStep 7: Created outgoing payment. Funds will now move from the outgoing payment to the incoming payment.',
      outgoingPayment,
    );

    this.outgoingPaymentCache.delete(
      finalizedOutgoingPaymentGrant.access_token.value,
    );

    return {
      status: 'success',
    };
  }
}
