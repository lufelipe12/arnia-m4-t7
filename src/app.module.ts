import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { CarsModule } from './cars/cars.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DriverLicensesModule } from './driver-licenses/driver-licenses.module';

@Module({
  imports: [
    AuthModule,
    CarsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    UsersModule,
    DriverLicensesModule,
  ],
})
export class AppModule {}
