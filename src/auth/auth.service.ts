import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Users } from '../database/entities';
import { Repository } from 'typeorm';
import { RegisterDto } from './dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
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

  private async findOneBy(email: string) {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.statusCode);
    }
  }
}
