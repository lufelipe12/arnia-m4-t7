import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';

import { RoleEnum } from '../../enums/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(RoleEnum)
  @IsOptional()
  role?: RoleEnum;

  @Type(() => Date)
  @IsNotEmpty()
  birthDate: Date;
}
