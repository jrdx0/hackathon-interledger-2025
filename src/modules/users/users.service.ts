import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from 'generated/prisma';

import { PrismaService } from 'src/prisma.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type UserWithoutPass = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a new user
   *
   * @param createUserDto - The data to create the user
   *
   * @returns The created user
   */
  async create(createUserDto: CreateUserDto): Promise<UserWithoutPass> {
    await this.throwIfUsernameExists(createUserDto.username);

    createUserDto.password = await bcrypt.hash(createUserDto.password, 12);

    return this.prisma.user.create({
      data: createUserDto,
      omit: { password: true },
    });
  }

  /**
   * Find all users
   *
   * @returns An array of users
   */
  findAll(): Promise<UserWithoutPass[]> {
    return this.prisma.user.findMany({
      omit: {
        password: true,
      },
    });
  }

  /**
   * Find a user by username
   *
   * @param username - The username of the user to find
   *
   * @returns The user with the given username
   */
  async findOne(username: string): Promise<UserWithoutPass> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      omit: { password: true },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con nombre de usuario ${username} no encontrado`,
      );
    }

    return user;
  }

  /**
   * Update a user
   *
   * @param username - The username of the user to update
   * @param updateUserDto - The data to update the user
   *
   * @returns The updated user
   */
  async update(
    username: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPass> {
    console.log(JSON.stringify(updateUserDto, null, 2));

    const user = await this.findOne(username);

    if (!user) {
      throw new NotFoundException(
        `Usuario con nombre de usuario ${username} no encontrado`,
      );
    }

    return this.prisma.user.update({
      where: { username },
      data: updateUserDto,
      omit: { password: true },
    });
  }

  /**
   * Remove a user
   *
   * @param username - The username of the user to remove
   *
   * @returns The removed user
   */
  remove(username: string): Promise<UserWithoutPass> {
    return this.prisma.user.delete({
      where: { username },
      omit: { password: true },
    });
  }

  /**
   * Throw an error if the username already exists
   *
   * @param username - The username to check
   *
   * @throws {BadRequestException} If the username already exists
   */
  async throwIfUsernameExists(username: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      where: { username },
      select: { username: true },
    });

    if (user) {
      throw new BadRequestException(
        `El usuario con nombre de usuario ${username} ya existe`,
      );
    }
  }
}
