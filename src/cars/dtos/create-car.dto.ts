import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString({
    message: 'A propriedade brand deve ser uma string.',
  })
  @IsNotEmpty({
    message: 'A propriedade brand é obrigatória.',
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;
}
