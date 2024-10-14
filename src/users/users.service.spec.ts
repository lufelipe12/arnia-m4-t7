import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import { createUserMock, usersRepositoryMock } from '../testing';

describe('Users Service', () => {
  let usersService: UsersService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, usersRepositoryMock],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('Should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('Create', () => {
    it('Should create an new user', async () => {
      const result = await usersService.create(createUserMock);

      expect(result).toHaveProperty('id');
    });
  });
});
