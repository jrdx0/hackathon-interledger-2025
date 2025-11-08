import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  @MaxLength(20, { message: 'Username must be at most 20 characters' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  username: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  password: string;

  @IsString({ message: 'Wallet URL must be a string' })
  @IsUrl(
    { host_whitelist: ['wallet.interledger-test.dev'] },
    { message: 'Wallet URL must be a valid URL' },
  )
  @IsOptional()
  walletUrl?: string;
}
