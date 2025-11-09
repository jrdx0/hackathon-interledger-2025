import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { Payload } from '../interface/payload.interface';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET as string,
    });
  }

  async validate(payload: Payload) {
    const user = await this.prismaService.user.findUnique({
      where: { username: payload.username },
      select: { username: true },
    });

    if (!user) {
      throw new UnauthorizedException('Unauthorized access');
    }

    return user;
  }
}
