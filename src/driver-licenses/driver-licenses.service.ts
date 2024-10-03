import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { DriverLicenses } from '../database/entities';
import { Repository } from 'typeorm';

@Injectable()
export class DriverLicensesService {
  constructor(
    @InjectRepository(DriverLicenses)
    private driverLicenseRepository: Repository<DriverLicenses>,
  ) {}

  async create(payload: CreateDriverLicenseDto, req: Request) {
    try {
      const { code } = payload;

      if (await this.findByCode(code)) {
        throw new BadRequestException(
          `A document with this code: ${code} already exists.`,
        );
      }

      const { userId } = req['user'];

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
}
