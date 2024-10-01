import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfig } from './jwt/jwt.config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    JwtModule.registerAsync({ global: true, ...jwtConfig }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
