import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from '../../database/entities';
import { usersMock } from './users.mock';
import { updateUserMock } from './update-user.mock';

export const usersRepositoryMock = {
  provide: getRepositoryToken(Users),
  useValue: {
    create: jest.fn().mockReturnValue(usersMock[1]),
    save: jest.fn(),
    find: jest.fn().mockResolvedValue(usersMock),
    findOne: jest.fn().mockResolvedValue(usersMock[1]),
    merge: jest.fn(),
    update: jest.fn(),
    findOneBy: jest
      .fn()
      .mockResolvedValue({ ...usersMock[1], ...updateUserMock }),
    softDelete: jest.fn(),
  },
};
