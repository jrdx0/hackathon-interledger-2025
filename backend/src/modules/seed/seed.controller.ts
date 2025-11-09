import { Controller, Post } from '@nestjs/common';
import { Public } from '../auth/decorators';
import { SeedService } from './seed.service';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Public()
  @Post('user')
  seedUser() {
    return this.seedService.seedUser();
  }
}
