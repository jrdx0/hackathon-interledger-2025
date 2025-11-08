import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';

import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';

import { UsersModule } from './modules/users/users.module';
import { PartiesModule } from './modules/parties/parties.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, PartiesModule, PaymentsModule, AuthModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
