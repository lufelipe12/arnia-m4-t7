import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dtos/create-car.dto';
import { CarPhotos, Cars, Users } from '../database/entities';
import { UpdateCarDto } from './dtos/update-car.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,

    @InjectRepository(CarPhotos)
    private carPhotosRepository: Repository<CarPhotos>,

    private configService: ConfigService,
  ) {}

  async create(payload: CreateCarDto) {
    try {
      const newCar = this.carsRepository.create(payload);

      await this.carsRepository.save(newCar);

      return newCar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async uploadPhoto(id: number, photo: Express.Multer.File) {
    try {
      if (!photo) {
        throw new BadRequestException('Invalid photo type');
      }

      await this.findBy(id);

      const photoUrl = `${this.configService.get('BASE_URL')}${this.configService.get('PORT')}/v1/cars/photos/${photo.filename}`;

      const newCarPhoto = this.carPhotosRepository.create({
        car: { id },
        url: photoUrl,
      });
      await this.carPhotosRepository.save(newCarPhoto);

      return newCarPhoto;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async buy(id: number, req: Request) {
    try {
      const car = await this.findBy(id);
      const { userId } = req['user'];

      car.user = { id: userId } as Users;

      await this.carsRepository.save(car);

      return await this.carsRepository.findOne({
        where: { id },
        relations: { user: true },
      });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async show(page: number, limit: number, color: string) {
    try {
      const pageOptions = { skip: (page - 1) * limit, take: limit };

      const cars = color
        ? await this.carsRepository.find({
            where: { color },
            ...pageOptions,
          })
        : await this.carsRepository.find({ ...pageOptions });

      return {
        page,
        limit,
        total: cars.length,
        data: cars,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findBy(id: number) {
    try {
      const car = await this.carsRepository.findOne({
        where: { id },
        relations: { carPhotos: true },
      });

      if (!car) {
        throw new NotFoundException(`A car with this id:${id} not found.`);
      }

      return car;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async updateBy(id: number, payload: UpdateCarDto) {
    try {
      const car = await this.findBy(id);

      const carModified = Object.assign(car, payload);

      await this.carsRepository.save(carModified);

      return car;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async deleteBy(id: number) {
    try {
      await this.findBy(id);

      await this.carsRepository.softDelete(id);

      return { response: 'ok' };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
