import {
  IsOptional,
  IsString,
  Min,
  MinLength,
  MaxLength,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { PaymentPeriod } from 'generated/prisma';

export class CreatePartyDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'El nombre debe tener como máximo 20 caracteres' })
  name: string;

  @IsOptional()
  @IsNumber({}, { message: 'La cantidad debe ser un número' })
  @Min(0, { message: 'La cantidad no puede ser negativa' })
  quantity: number;

  @IsOptional()
  @IsEnum(PaymentPeriod, {
    message:
      'El periodo debe ser uno de los siguientes: ANNUAL, MONTHLY, ONE_TIME',
  })
  period: PaymentPeriod;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, {
    message: 'La descripción debe tener como máximo 150 caracteres',
  })
  description: string;
}
