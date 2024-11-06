import { ApiProperty } from '@nestjs/swagger';

import { RoleEnum } from '../../enums/role.enum';

export class RegisterDoc {
  @ApiProperty({
    type: String,
    description: 'Users first name',
    example: 'Luiz Felipe',
    title: 'First Name',
  })
  firstName: string;

  @ApiProperty({
    type: String,
    description: 'Users last name',
    example: 'Dias',
    title: 'Last Name',
  })
  lastName: string;

  @ApiProperty({
    type: String,
    description: 'Users email',
    example: 'lf@gmail.com',
    title: 'Email',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Users password',
    example: '123456',
    title: 'Password',
  })
  password: string;

  @ApiProperty({
    type: 'enum',
    description: 'Users role',
    example: RoleEnum.A,
    title: 'Role',
    required: false,
    default: RoleEnum.S,
  })
  role?: RoleEnum;

  @ApiProperty({
    type: Date,
    description: 'Users birth date',
    example: '1996/02/19',
    title: 'Birth Date',
  })
  birthDate: Date;
}
