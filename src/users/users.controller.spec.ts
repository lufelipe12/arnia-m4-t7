import { Test, TestingModule } from '@nestjs/testing';

import { UsersController } from './users.controller';
import { AuthGuard } from '../auth/guards/auth.guard';
import {
  authGuardMock,
  createUserMock,
  currentUserMock,
  updateUserMock,
  usersServiceMock,
} from '../testing';

describe('Users Controller', () => {
  let usersController: UsersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [usersServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('Should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new user', async () => {
      const result = await usersController.create(createUserMock);

      expect(result).toHaveProperty('id');
    });
  });

  describe('Read', () => {
    it('Should return a list of users', async () => {
      const result = await usersController.show();

      expect(result.length).toBeGreaterThan(0);
    });

    it('Should return users profile', async () => {
      const result = await usersController.profile(currentUserMock);

      expect(result.deletedAt).toBeNull();
    });

    it('Should return an user by id', async () => {
      const result = await usersController.findById(1);

      expect(result).toBeDefined();
    });
  });

  describe('Update', () => {
    it('Should update an user by id', async () => {
      const result = await usersController.updateById(1, updateUserMock);

      expect(result.email).toEqual(updateUserMock.email);
    });
  });

  describe('Delete', () => {
    it('Should deactivate an user', async () => {
      const result = await usersController.deleteBy(1);

      expect(result).toHaveProperty('response');
    });
  });

  describe('Auth guard', () => {
    it('Shoud validate if guard is applied on route', async () => {
      const guards = Reflect.getMetadata('__guards__', usersController.profile);

      expect(guards.length).toEqual(1);
      expect(new guards[0]()).toBeInstanceOf(AuthGuard);
    });
  });
});
