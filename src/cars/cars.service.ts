import { Injectable } from '@nestjs/common';

import { CreateCarDto } from './dtos/create-car.dto';

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
}
