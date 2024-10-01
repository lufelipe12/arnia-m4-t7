import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,

    private jwtService: JwtService,
  ) {}

  async login(payload: LoginDto) {
    try {
      const user = await this.usersService.findBy(payload.email);

      if (!user || !bcrypt.compareSync(payload.password, user.password)) {
        throw new UnauthorizedException('Email or password wrong.');
      }

      const tokenPayload = {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
        iss: 'user-auth',
        aud: 'arnia-cars-users',
        sub: 'user-login',
      };

      return { accessToken: await this.jwtService.signAsync(tokenPayload) };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }
}
