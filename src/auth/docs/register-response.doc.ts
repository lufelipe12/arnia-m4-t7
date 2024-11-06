import { ApiProperty } from '@nestjs/swagger';
import { RegisterDoc } from './register.doc';

export class RegisterResponseDoc extends RegisterDoc {
  @ApiProperty({
    type: Number,
    description: 'Users ID',
    example: 1,
    title: 'Id',
  })
  id: number;

  @ApiProperty({
    type: Date,
    description: 'Date of users creation',
    example: new Date(),
    title: 'Create date',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date of last update',
    example: new Date(),
    title: 'Update date',
  })
  updatedAt: Date;

  @ApiProperty({
    type: Date,
    description: 'Date of users deletion',
    example: null,
    title: 'Delete date',
  })
  deletedAt: Date;
}
