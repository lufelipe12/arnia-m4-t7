import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuctionDto {
  @IsString()
  @IsNotEmpty()
  auctionName: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @Type(() => Date)
  @IsNotEmpty()
  date: Date;
}
