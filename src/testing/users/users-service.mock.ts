import { UsersService } from '../../users/users.service';
import { updateUserMock } from './update-user.mock';
import { usersMock } from './users.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findBy: jest.fn().mockResolvedValue(usersMock[1]),
    create: jest.fn().mockResolvedValue(usersMock[0]),
    show: jest.fn().mockResolvedValue(usersMock),
    profile: jest.fn().mockResolvedValue(usersMock[1]),
    findById: jest.fn().mockResolvedValue(usersMock[1]),
    updateById: jest
      .fn()
      .mockResolvedValue({ ...usersMock[1], ...updateUserMock }),
    deleteBy: jest.fn().mockResolvedValue({ response: 'ok' }),
  },
};
