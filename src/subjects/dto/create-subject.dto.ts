import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  code: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(5)
  credits: number;

  @IsString()
  @IsNotEmpty()
  campus: string;

  @IsString()
  @IsNotEmpty()
  classRoom: string;
}
