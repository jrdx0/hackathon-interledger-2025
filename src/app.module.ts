import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PartiesModule } from './modules/parties/parties.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [UsersModule, PartiesModule, PaymentsModule],
})
export class AppModule {}
