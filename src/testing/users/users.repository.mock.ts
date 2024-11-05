import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from '../../database/entities';

export const usersRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  },
};
