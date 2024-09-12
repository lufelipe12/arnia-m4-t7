import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

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

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.getCarById(id);
  }

  @Patch(':id')
  updateCarById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCarDto,
  ) {
    return this.carsService.updateCarById(id, body);
  }
}
