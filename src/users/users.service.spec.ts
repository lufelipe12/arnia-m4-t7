import { Test, TestingModule } from '@nestjs/testing';

import { UsersService } from './users.service';
import {
  createUserMock,
  currentUserMock,
  updateUserMock,
  usersRepositoryMock,
} from '../testing';

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
    it('Should create a new user', async () => {
      jest.spyOn(usersService, 'findBy').mockResolvedValueOnce(null);

      const result = await usersService.create(createUserMock);

      expect(result).toHaveProperty('id');
    });
  });

  describe('Read', () => {
    it('Should return a list of users', async () => {
      const result = await usersService.show();

      expect(result.length).toBeGreaterThan(0);
    });

    it('Should return an user by email', async () => {
      const result = await usersService.findBy(
        'leonardo_jesus@jovempanfmtaubate.com.br',
      );

      expect(result).toHaveProperty('createdAt');
      expect(result.deletedAt).toBeNull();
    });

    it('Should return an user by id', async () => {
      const result = await usersService.findById(1);

      expect(result).toBeTruthy();
    });

    it('Should return users profile', async () => {
      const result = await usersService.profile(currentUserMock);

      expect(result.email).toBeDefined();
    });
  });

  describe('Update', () => {
    it('Should update an user by id', async () => {
      const result = await usersService.updateById(1, updateUserMock);

      expect(result.email).toEqual(updateUserMock.email);
    });
  });

  describe('Delete', () => {
    it('Should deactivate an user', async () => {
      const result = await usersService.deleteBy(1);

      expect(result).toHaveProperty('response');
    });
  });
});
