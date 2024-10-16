import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';

import { AuthService } from './auth.service';
import { jwtServiceMock, loginMock, usersServiceMock } from '../testing';

describe('Auth Service', () => {
  let authService: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, usersServiceMock, jwtServiceMock],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('Should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('Authentication', () => {
    it('Should return a token for user authorization', async () => {
      jest.spyOn(bcrypt, 'compareSync').mockReturnValueOnce(true);

      const result = await authService.login(loginMock);

      expect(result).toHaveProperty('accessToken');
      expect(typeof result.accessToken).toEqual('string');
    });
  });
});
