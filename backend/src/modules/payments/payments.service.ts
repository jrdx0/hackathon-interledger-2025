import { Injectable } from '@nestjs/common';

import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { PaymentDto, ContinuePaymentDto } from './dto/payment.dto';
import { InterledgerService } from 'src/interledger.service';

@Injectable()
export class PaymentsService {
  constructor(private readonly interledgerService: InterledgerService) {}

  create(createPaymentDto: CreatePaymentDto) {
    return 'This action adds a new payment';
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

  payment(paymentDto: PaymentDto) {
    return this.interledgerService.executePayment(
      paymentDto.receiver_wallet_address_url,
      paymentDto.sender_wallet_address_url,
    );
  }

  continuePayment(continuePaymentDto: ContinuePaymentDto) {
    return this.interledgerService.continueGrant(
      continuePaymentDto.access_token,
    );
  }
}
