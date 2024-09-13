import { ApiProperty } from '@nestjs/swagger';
import { CreateCarDoc } from './create-car.doc';

export class CreatedCarDoc extends CreateCarDoc {
  @ApiProperty({
    description: 'Cars Id',
    example: 1,
    type: Number,
  })
  id: number;

  @ApiProperty({
    description: 'Create date',
    example: '2024-09-13T22:43:23.923Z',
    type: Date,
  })
  createdAt: Date;
}
