import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { InterledgerService } from 'src/interledger.service';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, InterledgerService],
})
export class UsersModule {}
