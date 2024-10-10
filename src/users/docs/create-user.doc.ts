import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '../enums/role.enum';

export class CreateUserDoc {
  @ApiProperty({
    description: 'First name of the user.',
    example: 'Luiz Felipe',
    type: String,
    title: 'First Name',
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Dias',
    type: String,
    title: 'Last Name',
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    description: 'Users email',
    example: 'lf@gmail.com',
    type: String,
    title: 'Email',
  })
  email: string;

  @ApiProperty({
    description: 'Users password',
    example: 'batata123',
    type: String,
    title: 'Password',
  })
  password: string;

  @ApiProperty({
    description: 'Users age',
    example: 18,
    type: Number,
    title: 'Age',
    required: false,
  })
  age?: number;

  @ApiProperty({
    description: 'Users role',
    example: RoleEnum.announcer,
    type: RoleEnum,
    title: 'Role',
    enum: RoleEnum,
  })
  role: RoleEnum;
}
