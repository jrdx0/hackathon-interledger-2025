import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import {
  PartiesController,
  PartyInvitationController,
} from './parties.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PartiesController, PartyInvitationController],
  providers: [PartiesService, PrismaService],
})
export class PartiesModule {}
