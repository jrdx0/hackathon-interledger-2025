import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma.service';

import { LoginResponse } from './interface/login-response.interface';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResponse> {
    await this.validateUser(loginDto.username, loginDto.password);

    const payload = { username: loginDto.username };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { username },
      select: { username: true, password: true },
    });

    if (!user || !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
