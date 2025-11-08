import { Module } from '@nestjs/common';
import { PartiesService } from './parties.service';
import { PartiesGateway } from './parties.gateway';

@Module({
  providers: [PartiesGateway, PartiesService],
})
export class PartiesModule {}
