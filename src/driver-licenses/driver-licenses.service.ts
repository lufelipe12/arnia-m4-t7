import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { DriverLicenses } from '../database/entities';
import { UsersService } from '../users/users.service';

@Injectable()
export class DriverLicensesService {
  constructor(
    @InjectRepository(DriverLicenses)
    private driverLicenseRepository: Repository<DriverLicenses>,

    private usersService: UsersService,
  ) {}

  async create(payload: CreateDriverLicenseDto, req: Request) {
    try {
      const { userId } = req['user'];

      if ((await this.usersService.findById(userId)).driverLicense) {
        throw new BadRequestException(
          'You already have a driver license registered.',
        );
      }

      const { code } = payload;

      if (await this.findByCode(code)) {
        throw new BadRequestException(
          `A document with this code: ${code} already exists.`,
        );
      }

      const driverLicense = this.driverLicenseRepository.create({
        user: userId,
        ...payload,
      });

      await this.driverLicenseRepository.save(driverLicense);

      return driverLicense;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findByCode(code: string) {
    try {
      return await this.driverLicenseRepository.existsBy({ code });
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async show() {
    try {
      return this.driverLicenseRepository.find();
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
