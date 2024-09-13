import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CreateCarDoc } from './docs/create-car.doc';
import { CreatedCarDoc } from './docs/created-car.doc';

@ApiTags('cars')
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post()
  @ApiBody({
    type: CreateCarDoc,
  })
  @ApiResponse({
    type: CreatedCarDoc,
    status: 201,
  })
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

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.deleteCarById(id);
  }
}
