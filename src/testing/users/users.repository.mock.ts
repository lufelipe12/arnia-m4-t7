import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from '../../database/entities';
import { usersMock } from './users.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    create: jest.fn().mockReturnValue(usersMock[0]),
    save: jest.fn(),
    findOne: jest.fn().mockResolvedValue(usersMock[0]),
  },
};
