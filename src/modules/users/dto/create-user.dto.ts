import {
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  @MaxLength(20, {
    message: 'El nombre de usuario debe tener como máximo 20 caracteres',
  })
  @MinLength(3, {
    message: 'El nombre de usuario debe tener al menos 3 caracteres',
  })
  username: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsString({ message: 'La URL de la billetera debe ser una cadena de texto' })
  @IsUrl(
    { host_whitelist: ['wallet.interledger-test.dev'] },
    { message: 'La URL de la billetera debe ser una URL válida' },
  )
  @IsOptional()
  url_wallet?: string;
}
