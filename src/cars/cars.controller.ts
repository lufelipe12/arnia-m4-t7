import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  createCar(@Body() body: CreateCarDto) {
    return this.carsService.createCar(body);
  }

  @Get()
  getCars(@Query('year') year?: number) {
    return this.carsService.getCars(year);
  }
}
