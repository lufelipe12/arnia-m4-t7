import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subjects } from '../database/entities';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,
  ) {}

  async create(payload: CreateSubjectDto) {
    try {
      const { name, code } = payload;

      if (
        await this.subjectsRepository
          .createQueryBuilder()
          .where('"name" = :name', { name })
          .orWhere('"code" = :code', { code })
          .getOne()
      ) {
        throw new BadRequestException(
          'Code or name for subject already exists ',
        );
      }

      const subject = this.subjectsRepository.create(payload);

      await this.subjectsRepository.save(subject);

      return subject;
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async find(name: string) {
    try {
      return await this.subjectsRepository.find({
        where: { name: ILike(`%${name}%`) },
      });
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
