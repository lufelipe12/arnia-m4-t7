import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Injectable()
export class CarsService {
  private carsDb = [];

  createCar(body: CreateCarDto) {
    const newCar = {
      id: this.carsDb.length + 1,
      ...body,
      createdAt: new Date(),
    };

    this.carsDb.push(newCar);

    return newCar;
  }

  getCars(year?: number) {
    return year
      ? this.carsDb.filter((car) => car.year == Number(year))
      : this.carsDb;
  }

  getCarById(id: number) {
    const car = this.carsDb.find((car) => car.id === id);

    if (!car) {
      throw new NotFoundException(`A car with this id: ${id} not found.`);
    }

    return car;
  }

  updateCarById(id: number, body: UpdateCarDto) {
    const carToUpdate = this.getCarById(id);

    Object.assign(carToUpdate, body);

    return carToUpdate;
  }
}
