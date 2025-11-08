import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    await this.throwIfUsernameExists(createUserDto.username);

    return this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(username: string, updateUserDto: UpdateUserDto) {
    return `This action updates a #${username} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async throwIfUsernameExists(username: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { username } });

    if (user) {
      throw new BadRequestException(
        `User with username ${username} already exists`,
      );
    }
  }
}
