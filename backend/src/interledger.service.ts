import {
  AuthenticatedClient,
  createAuthenticatedClient,
  isFinalizedGrant,
  isPendingGrant,
  OpenPaymentsClientError,
} from '@interledger/open-payments';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import readline from 'readline/promises';
import * as fs from 'fs';

@Injectable()
export class InterledgerService implements OnModuleInit {
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

  async createPayment(
    sendingWalletAddressUrl: string,
    receivingWalletAddressUrl: string,
  ) {
    const sendingWalletAddress = await this.client.walletAddress.get({
      url: sendingWalletAddressUrl,
    });
    const receivingWalletAddress = await this.client.walletAddress.get({
      url: receivingWalletAddressUrl,
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
  }
}
