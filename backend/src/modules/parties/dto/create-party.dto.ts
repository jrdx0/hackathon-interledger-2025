import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  MinLength,
  MaxLength,
  IsDecimal,
  IsNumber,
} from 'class-validator';

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
  @IsString({ message: 'El periodo debe ser una cadena de texto' })
  @MaxLength(10, { message: 'El periodo debe tener como máximo 10 caracteres' })
  period: string;

  @IsOptional()
  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  @MaxLength(150, {
    message: 'La descripción debe tener como máximo 150 caracteres',
  })
  description: string;
}
