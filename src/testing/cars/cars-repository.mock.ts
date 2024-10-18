import { getRepositoryToken } from '@nestjs/typeorm';

import { Cars } from '../../database/entities';
import { carsMock } from './cars.mock';

export const carsRepositoryMock = {
  provide: getRepositoryToken(Cars),
  useValue: {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn().mockReturnValue(carsMock[0]),
    find: jest.fn(),
    softDelete: jest.fn(),
  },
};
