import { Type } from 'class-transformer';
import { IsNumber, Min, IsString, MinLength, MaxLength } from 'class-validator';

export class CreatePaymentDto {
  @IsString({ message: 'id_party debe ser una cadena' })
  @MinLength(3, { message: 'id_party debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'id_party debe tener como máximo 50 caracteres' })
  party_id: string;
}
