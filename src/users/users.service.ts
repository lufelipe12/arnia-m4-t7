import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../database/entities';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.statusCode);
    }
  }
}
