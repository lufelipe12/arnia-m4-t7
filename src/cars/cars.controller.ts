import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  Request,
} from '@nestjs/common';

import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  async create(@Body() payload: CreateCarDto) {
    return await this.carsService.create(payload);
  }

  @Post(':id/buy')
  async buy(@Param('id', ParseIntPipe) id: number, @Request() req: Request) {
    return await this.carsService.buy(id, req);
  }

  @Get()
  async show(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 5,
    @Query('color') color: string,
  ) {
    return await this.carsService.show(page, limit, color);
  }

  @Get(':id')
  async findBy(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.findBy(id);
  }

  @HttpCode(HttpStatus.CREATED)
  @Patch(':id')
  async updateBy(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCarDto,
  ) {
    return await this.carsService.updateBy(id, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async deleteBy(@Param('id', ParseIntPipe) id: number) {
    return await this.carsService.deleteBy(id);
  }
}
