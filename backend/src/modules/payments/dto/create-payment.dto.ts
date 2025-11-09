import { Type } from 'class-transformer';
import {
  IsNumber,
  Min,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
  Matches,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNumber({}, { message: 'quantity_expected debe ser un número' })
  @Min(0, { message: 'quantity_expected no puede ser negativo' })
  @Type(() => Number)
  quantity_expected: number;

  @IsString({ message: 'id_party debe ser una cadena' })
  @MinLength(3, { message: 'id_party debe tener al menos 3 caracteres' })
  @MaxLength(50, { message: 'id_party debe tener como máximo 50 caracteres' })
  id_party: string;

  @IsString({ message: 'user_username debe ser una cadena' })
  @MinLength(3, { message: 'user_username debe tener al menos 3 caracteres' })
  @MaxLength(20, { message: 'user_username debe tener como máximo 20 caracteres' })
  user_username: string;

  @IsBoolean({ message: 'is_paid debe ser booleano' })
  @Type(() => Boolean)
  is_paid: boolean;

  // Valida formato DD-MM-YYYY (por ejemplo, 08-11-2025)
  @Matches(
    /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-[0-9]{4}$/,
    { message: 'period_paid debe tener el formato DD-MM-YYYY' },
  )
  period_paid: string;
}
