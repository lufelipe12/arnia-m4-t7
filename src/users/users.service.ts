import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dtos/create-user.dto';
import { Users } from '../database/entities';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUserDto } from '../auth/dtos/current-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async create(payload: CreateUserDto) {
    try {
      if (await this.findBy(payload.email)) {
        throw new BadRequestException(
          `An user with this email: ${payload.email} already exists.`,
        );
      }

      const newUser = this.usersRepository.create(payload);

      await this.usersRepository.save(newUser);

      return newUser;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async show() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findBy(email: string) {
    try {
      return await this.usersRepository.findOne({
        where: { email },
        select: { id: true, email: true, password: true, role: true },
      });
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, error.status);
    }
  }

  async findById(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: {
          driverLicense: true,
          cars: true,
          auctions: true,
        },
      });

      if (!user) {
        throw new NotFoundException(`An user with this id:${id} not found.`);
      }

      return user;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async profile(currentUser: CurrentUserDto) {
    try {
      return await this.findById(currentUser.userId);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async updateById(id: number, payload: UpdateUserDto) {
    try {
      await this.findById(id);

      await this.usersRepository.update(id, payload);

      return this.usersRepository.findOneBy({ id });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async deleteBy(id: number) {
    try {
      await this.findById(id);

      await this.usersRepository.softDelete(id);

      return { response: 'ok' };
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}