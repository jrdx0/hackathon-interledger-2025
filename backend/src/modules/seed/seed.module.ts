import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [SeedController],
  providers: [SeedService, UsersService, PrismaService],
})
export class SeedModule {}
