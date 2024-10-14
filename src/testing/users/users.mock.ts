import { Users } from '../../database/entities';
import { RoleEnum } from '../../users/enums/role.enum';

export const usersMock: Users[] = [
  {
    id: 1,
    firstName: 'Leonardo',
    lastName: 'Juan Jesus',
    email: 'leonardo_jesus@jovempanfmtaubate.com.br',
    password: '12345',
    age: 41,
    role: RoleEnum.announcer,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    passwordHash: null,
  },
  {
    id: 2,
    firstName: 'Luiz Felipe',
    lastName: 'Dias',
    email: 'lf@gmail.com',
    password: '12345',
    age: 29,
    role: RoleEnum.admin,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    passwordHash: null,
  },
  {
    id: 3,
    firstName: 'Teste',
    lastName: 'Testando',
    email: 'teste@mail.com',
    password: '12345',
    age: 19,
    role: RoleEnum.buyer,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    passwordHash: null,
  },
];
