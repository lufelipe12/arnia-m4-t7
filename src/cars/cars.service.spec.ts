import { Test, TestingModule } from '@nestjs/testing';

import { CarsService } from './cars.service';
import {
  carPhotosRepositoryMock,
  carsRepositoryMock,
  configServiceMock,
} from '../testing';
import { getFileMock } from '../testing/cars/get-file.mock';

describe('Cars Service', () => {
  let carsService: CarsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarsService,
        carsRepositoryMock,
        carPhotosRepositoryMock,
        configServiceMock,
      ],
    }).compile();

    carsService = module.get<CarsService>(CarsService);
  });

  it('Should be defined', () => {
    expect(carsService).toBeDefined();
  });

  describe('Create', () => {
    it('Should upload a photo', async () => {
      const result = await carsService.uploadPhoto(1, await getFileMock());

      expect(result).toHaveProperty('id');
    });
  });
});
