import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import {
  jwtServiceMock,
  loginMock,
  registerMock,
  usersRepositoryMock,
} from '../testing';

describe('AuthService', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, usersRepositoryMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Shoud be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Create', () => {
    it('Should register a new user', async () => {
      jest
        .spyOn(usersRepositoryMock.useValue, 'findOne')
        .mockResolvedValueOnce(null);

      const result = await authService.register(registerMock);

      expect(result).toHaveProperty('id');
      expect(result.deletedAt).toBeNull();
    });
  });

  describe('Login', () => {
    it('Should return an access token', async () => {
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never);

      const result = await authService.login(loginMock);

      expect(typeof result.token).toEqual('string');
    });
  });
});
