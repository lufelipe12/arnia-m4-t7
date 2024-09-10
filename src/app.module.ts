import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CarsModule } from './cars/cars.module';

@Module({
  imports: [CarsModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
