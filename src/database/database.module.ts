import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import typeOrmModuleOptions from './database.config';

@Module({
  imports: [TypeOrmModule.forRootAsync(typeOrmModuleOptions)],
})
export class DatabaseModule {}
