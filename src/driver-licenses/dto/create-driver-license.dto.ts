import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriverLicenseDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @Type(() => Date)
  @IsNotEmpty()
  expirationDate: Date;
}
