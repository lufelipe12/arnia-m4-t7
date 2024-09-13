import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDoc {
  @ApiProperty({
    description: 'A brand for a car.',
    example: 'BYD',
    type: String,
    required: true,
  })
  brand: string;

  @ApiProperty({
    description: 'A model for a car.',
    example: 'Dolphin',
    type: String,
    required: true,
  })
  model: string;

  @ApiProperty({
    description: 'A color for a car.',
    example: 'grey',
    type: String,
    required: true,
  })
  color: string;

  @ApiProperty({
    description: 'Year of cars creation',
    example: 2021,
    type: Number,
    required: true,
  })
  year: number;
}
