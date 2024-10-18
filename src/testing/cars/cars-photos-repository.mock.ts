import { getRepositoryToken } from '@nestjs/typeorm';
import { CarPhotos } from '../../database/entities';
import { carPhotoMock } from './car-photo.mock';

export const carPhotosRepositoryMock = {
  provide: getRepositoryToken(CarPhotos),
  useValue: {
    create: jest.fn().mockReturnValue(carPhotoMock),
    save: jest.fn(),
  },
};
