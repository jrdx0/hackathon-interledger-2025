import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { InterledgerService } from 'src/interledger.service';

import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService, PrismaService, InterledgerService],
})
export class PaymentsModule {}
