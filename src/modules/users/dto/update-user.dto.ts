import { OmitType, PartialType } from '@nestjs/mapped-types';
import { IsString, MaxLength, MinLength } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['username', 'password']),
) {
  @IsString({ message: 'Username must be a string' })
  @MaxLength(20, { message: 'Username must be at most 20 characters' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  username: string;
}
