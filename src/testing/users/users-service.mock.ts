import { UsersService } from '../../users/users.service';
import { usersMock } from './users.mock';

export const usersServiceMock = {
  provide: UsersService,
  useValue: {
    findBy: jest.fn().mockResolvedValue(usersMock[1]),
  },
};
