import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { UsersModule } from './users.module';
import { authGuardMock, createUserMock, usersRepositoryMock } from '../testing';
import { AuthGuard } from '../auth/guards/auth.guard';

describe('Users Module e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    })
      .overrideProvider(usersRepositoryMock.provide)
      .useValue(usersRepositoryMock.useValue)
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());

    app.init();
  });

  afterAll(async () => {
    app.close();
  });

  it('Should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Create', () => {
    it('Should create a new user', async () => {
      jest
        .spyOn(usersRepositoryMock.useValue, 'findOne')
        .mockResolvedValueOnce(null);

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(createUserMock);

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('createdAt');
    });

    it('Should not create an user without email', async () => {
      const { email, ...wrongPayload } = createUserMock;

      const response = await request(app.getHttpServer())
        .post('/users')
        .send(wrongPayload);

      expect(response.statusCode).toEqual(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Read', () => {
    it('Should return an users profile', async () => {
      const response = await request(app.getHttpServer()).get('/users/profile');

      expect(response.statusCode).toEqual(200);
      expect(response.body).toHaveProperty('email');
    });
  });
});
