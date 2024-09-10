import { Body, Controller, Get, Post } from '@nestjs/common';

import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get('')
  getCars(@Body() body: any) {
    console.log('BODY', body);
    return this.carsService.getCars();
  }

  @Post('')
  createCar(@Body() body: any) {
    console.log('BODY', body);
  }
}
