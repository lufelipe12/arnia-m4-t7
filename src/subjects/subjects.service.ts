import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository, ILike } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subjects, Users } from '../database/entities';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { CurrentUserDto } from '../users/dto/current-user.dto';
import { UsersService } from '../users/users.service';
import { RoleEnum } from '../enums/role.enum';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subjects)
    private subjectsRepository: Repository<Subjects>,

    private usersService: UsersService,
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

  async addStudent(id: number, currentUser: CurrentUserDto) {
    try {
      const subject = await this.subjectsRepository.findOne({
        where: { id },
        relations: { students: true },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      subject.students.push({ id: currentUser.userId } as Users);

      await this.subjectsRepository.save(subject);

      return await this.findOne(id);
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async addInstructor(id: number, instructorId: number) {
    try {
      const subject = await this.subjectsRepository.findOne({
        where: { id },
        relations: { instructor: true },
      });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      const instructor = await this.usersService.findOne(instructorId);

      if (instructor.role !== RoleEnum.I) {
        throw new BadRequestException('This user is not an instructor.');
      }

      subject.instructor = instructor;

      await this.subjectsRepository.update(id, subject);

      return await this.findOne(id);
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async find(name?: string) {
    try {
      const findOptions = name ? { name: ILike(`%${name}%`) } : {};

      return await this.subjectsRepository.find({
        where: findOptions,
      });
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: number) {
    try {
      const subject = await this.subjectsRepository.findOne({ where: { id } });

      if (!subject) {
        throw new NotFoundException(`A subject with this id: ${id} not found.`);
      }

      return subject;
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: number, payload: UpdateSubjectDto) {
    try {
      await this.findOne(id);

      await this.subjectsRepository.update(id, payload);

      return await this.findOne(id);
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async delete(id: number) {
    try {
      await this.findOne(id);

      await this.subjectsRepository.softDelete(id);

      return { message: 'ok' };
    } catch (error) {
      console.error(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
