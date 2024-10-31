import {
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../database/entities';
import { CurrentUserDto } from './dto/current-user.dto';
import { RoleEnum } from '../enums/role.enum';
import { UpdateUserDto } from './dto/update-user.dto';

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

      throw new HttpException(error.message, error.status);
    }
  }

  async profile(currentUser: CurrentUserDto) {
    try {
      const relations =
        currentUser.userRole === RoleEnum.I
          ? {
              subjects: true,
            }
          : currentUser.userRole === RoleEnum.S
            ? {
                classes: true,
              }
            : null;

      return await this.usersRepository.findOne({
        where: { id: currentUser.userId },
        relations,
      });
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) {
        throw new NotFoundException(`An user with this id: ${id} not found.`);
      }

      return user;
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateUserDto) {
    try {
      await this.findOne(id);

      await this.usersRepository.update(id, payload);

      return await this.findOne(id);
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async reactivate(id: number) {
    try {
      const response = await this.usersRepository.restore({ id });

      if (response.affected === 0) {
        return { message: 'No users restored' };
      }

      return { message: 'User restored successfully' };
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number, currentUser: CurrentUserDto) {
    try {
      await this.findOne(id);

      if (currentUser.userRole !== RoleEnum.A && currentUser.userId !== id) {
        throw new UnauthorizedException(
          'You dont have permitions to delete other users.',
        );
      }

      await this.usersRepository.softDelete(id);

      return { message: 'ok' };
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
