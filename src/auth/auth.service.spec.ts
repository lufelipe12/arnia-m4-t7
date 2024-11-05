import { Test, TestingModule } from '@nestjs/testing';

import { AuthService } from './auth.service';
import { jwtServiceMock, usersRepositoryMock } from '../testing';

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
});
