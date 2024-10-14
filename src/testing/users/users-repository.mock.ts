import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from '../../database/entities';
import { usersMock } from './users.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    create: jest.fn().mockReturnValue(usersMock[1]),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    merge: jest.fn(),
    softDelete: jest.fn(),
  },
};
