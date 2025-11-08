import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsGateway } from './payments.gateway';

@Module({
  providers: [PaymentsGateway, PaymentsService],
})
export class PaymentsModule {}
