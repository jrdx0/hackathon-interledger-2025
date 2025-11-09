import { Controller, Post, Body, Get } from '@nestjs/common';

import { Public } from './decorators';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CurrentUser } from './decorators/current-user.decorator';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  me(@CurrentUser() currentUser: { username: string }) {
    return this.authService.me(currentUser);
  }
}
