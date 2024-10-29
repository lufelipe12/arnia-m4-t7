import {
  BadRequestException,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { Users } from '../database/entities';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,

    private jwtService: JwtService,
  ) {}

  async register(payload: RegisterDto) {
    try {
      if (await this.findOneBy(payload.email)) {
        throw new BadRequestException(
          `An user with this email: ${payload.email} already exists.`,
        );
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.statusCode);
    }
  }

  async login(payload: LoginDto) {
    try {
      const user = await this.findOneBy(payload.email);

      if (!user || !(await bcrypt.compare(payload.password, user.password))) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const tokenInformations = {
        userId: user.id,
        userEmail: user.email,
        userRole: user.role,
        iss: 'College user',
        aud: 'Users from college',
      };

      return { token: await this.jwtService.signAsync(tokenInformations) };
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.statusCode);
    }
  }

  private async findOneBy(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: { password: true, id: true, email: true, role: true },
      });
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.statusCode);
    }
  }
}
