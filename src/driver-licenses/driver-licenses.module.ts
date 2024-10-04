import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverLicensesService } from './driver-licenses.service';
import { DriverLicensesController } from './driver-licenses.controller';
import { DriverLicenses } from '../database/entities';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([DriverLicenses]), UsersModule],
  controllers: [DriverLicensesController],
  providers: [DriverLicensesService],
})
export class DriverLicensesModule {}
