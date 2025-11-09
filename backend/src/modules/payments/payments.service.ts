import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { PaymentPeriod, Prisma, PrismaClient } from 'generated/prisma';

import { InterledgerService } from 'src/interledger.service';
import { PrismaService } from 'src/prisma.service';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentDto, ContinuePaymentDto } from './dto/payment.dto';
import { DefaultArgs } from 'generated/prisma/runtime/library';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly interledgerService: InterledgerService,
  ) { }

  /**
   * Create a payment
   * 
   * @param createPaymentDto - The create payment dto
   * 
   * @returns The payment
   */
  async create(currentUser: { username: string }, createPaymentDto: CreatePaymentDto) {
    await this.validateLastPaymentPeriod(
      createPaymentDto.party_id,
      currentUser.username,
    );

    const amount = await this.getUserDebitAmount(
      createPaymentDto.party_id,
    );

    return await this.prisma.$transaction(async (tx) => {
      const receiverWalletAddressUrl =
        await this.getPaymentReceiverWalletAddressUrl(
          createPaymentDto.party_id,
          tx,
        );
      const senderWalletAddressUrl =
        await this.getPaymentSenderWalletAddressUrl(
          { username: currentUser.username },
          tx,
        );

      const payment = await this.interledgerService.executePayment({
        receiverWalletAddressUrl,
        senderWalletAddressUrl,
        amount,
      });

      if (payment.status === 'pending') {
        return payment;
      }

      if (!payment.quote) {
        throw new InternalServerErrorException('No se encontro el quote');
      }

      await tx.usersPayment.create({
        data: {
          party_id: createPaymentDto.party_id,
          user_username: currentUser.username,
          transfered_amount: amount,
          quote_amount: payment.quote.debitAmount.value,
        },
      });

      return payment;
    });
  }

  findAll() {
    return `This action returns all payments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payment`;
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  async continuePayment(continuePaymentDto: ContinuePaymentDto) {
    return await this.prisma.$transaction(async (tx) => {
      const result = await this.interledgerService.continueGrant(
        continuePaymentDto.access_token,
      );

      // if (result.status === 'SUCCESS') {
      //   await tx.usersPayment.create({
      //     data: {
      //       // transfered_amount: continuePaymentDto.transfered_amount,
      //       // quote_amount: continuePaymentDto.quote_amount,
      //       // party_id: continuePaymentDto.party_id,
      //       // user_username: continuePaymentDto.user_username,
      //     },
      //   });
      // }
    })
  }

  /**
   * Get the receiver wallet address url
   * 
   * @param party_id - The party id
   * @param prismaClient - The prisma client
   * 
   * @returns The receiver wallet address url
   */
  async getPaymentReceiverWalletAddressUrl(
    party_id: string,
    prismaClient:
      | PrismaService
      | Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
      > = this.prisma,
  ): Promise<string> {
    const party = await prismaClient.party.findUnique({
      where: {
        id: party_id,
      },
      select: {
        created_by_id: true,
      },
    });

    if (!party) {
      throw new NotFoundException('No se encontro la party');
    }

    const user = await prismaClient.user.findUnique({
      where: {
        username: party.created_by_id,
      },
      select: {
        url_wallet: true,
      },
    });

    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }

    return user.url_wallet;
  }

  /**
   * Get the sender wallet address url
   * 
   * @param currentUser - The current user
   * @param prismaClient - The prisma client
   * 
   * @returns The sender wallet address url
   */
  async getPaymentSenderWalletAddressUrl(
    currentUser: { username: string },
    prismaClient:
      | PrismaService
      | Omit<
        PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
        '$connect' | '$disconnect' | '$on' | '$transaction' | '$extends'
      > = this.prisma,
  ): Promise<string> {
    const user = await prismaClient.user.findUnique({
      where: {
        username: currentUser.username,
      },
      select: {
        url_wallet: true,
      },
    });

    if (!user) {
      throw new NotFoundException('No se encontro el usuario');
    }

    return user.url_wallet;
  }

  /**
   * Validate the last payment period
   * 
   * @param party_id - The party id
   * @param user_username - The user username
   * 
   * @returns void
   */
  async validateLastPaymentPeriod(
    party_id: string,
    user_username: string,
  ): Promise<void> {
    const isUserOnParty = await this.prisma.partyUsers.count({
      where: {
        party_id: party_id,
        user_username: user_username,
      },
    });

    if (isUserOnParty === 0) {
      throw new NotFoundException('No se encontro el usuario en la party');
    }

    const party = await this.prisma.party.findUnique({
      where: {
        id: party_id,
      },
      select: {
        period: true,
      },
    });

    if (!party) {
      throw new NotFoundException('No se encontro la party');
    }

    const lastPayment = await this.prisma.usersPayment.findFirst({
      where: {
        party_id: party_id,
        user_username: user_username,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    if (!lastPayment) {
      return;
    }

    if (party.period === PaymentPeriod.ONE_TIME) {
      throw new BadRequestException('No se puede pagar más de una vez');
    }

    const now = new Date();
    const lastPaymentDate = lastPayment.created_at;

    if (party.period === PaymentPeriod.MONTHLY) {
      const lastPaymentMonth = lastPaymentDate.getMonth();
      const lastPaymentYear = lastPaymentDate.getFullYear();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      if (
        lastPaymentMonth === currentMonth &&
        lastPaymentYear === currentYear
      ) {
        throw new BadRequestException(
          'No se puede pagar más de una vez al mes',
        );
      }
    }

    if (party.period === PaymentPeriod.ANNUAL) {
      const lastPaymentYear = lastPaymentDate.getFullYear();
      const currentYear = now.getFullYear();

      if (lastPaymentYear === currentYear) {
        throw new BadRequestException(
          'No se puede pagar más de una vez al año',
        );
      }
    }
  }

  /**
   * Get the user debit amount
   * 
   * @param party_id - The party id
   * 
   * @returns The user debit amount
   */
  async getUserDebitAmount(
    party_id: string,
  ): Promise<number> {
    const party = await this.prisma.party.findUnique({
      where: {
        id: party_id,
      },
      select: {
        quantity: true,
      },
    });

    if (!party) {
      throw new NotFoundException('No se encontro la party');
    }

    const usersOnParty = await this.prisma.partyUsers.count({
      where: {
        party_id: party_id,
      },
    });

    if (!usersOnParty || usersOnParty === 0) {
      throw new NotFoundException('No se encontro la party');
    }

    return (party.quantity.toNumber() / (usersOnParty + 1));
  }
}
