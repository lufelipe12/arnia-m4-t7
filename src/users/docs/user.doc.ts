import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDoc } from './create-user.doc';

export class UserDoc extends CreateUserDoc {
  @ApiProperty({
    description: 'Users identificator',
    example: 1,
    type: Number,
    title: 'Id',
  })
  id: number;

  @ApiProperty({
    description: 'Date of users creation',
    example: new Date(),
    type: Date,
    title: 'Create date',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Date of users update',
    example: new Date(),
    type: Date,
    title: 'Update date',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Date of users deletion',
    example: null,
    type: Date,
    title: 'Delete date',
  })
  deletedAt: Date;
}
