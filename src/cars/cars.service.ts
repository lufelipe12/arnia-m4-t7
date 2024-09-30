import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCarDto } from './dtos/create-car.dto';
import { Cars } from '../database/entities';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Cars)
    private carsRepository: Repository<Cars>,
  ) {}

  async create(payload: CreateCarDto) {
    try {
      const newCar = this.carsRepository.create(payload);

      await this.carsRepository.save(newCar);

      return newCar;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async show(color: string) {
    try {
      return color
        ? await this.carsRepository.find({ where: { color } })
        : await this.carsRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findBy(id: number) {
    try {
      const car = await this.carsRepository.findOne({ where: { id } });

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
