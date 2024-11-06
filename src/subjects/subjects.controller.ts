import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { SubjectsService } from './subjects.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../users/dto/current-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Post()
  async create(@Body() payload: CreateSubjectDto) {
    return await this.subjectsService.create(payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.S)
  @Post(':id/students')
  async addStudent(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.subjectsService.addStudent(id, currentUser);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Post(':id/instructors/:instructorId')
  async addInstructor(
    @Param('id', ParseIntPipe) id: number,
    @Param('instructorId', ParseIntPipe) instructorId: number,
  ) {
    return await this.subjectsService.addInstructor(id, instructorId);
  }

  @Get()
  async find(@Query('name') name?: string) {
    return await this.subjectsService.find(name);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.findOne(id);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateSubjectDto,
  ) {
    return await this.subjectsService.update(id, payload);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.subjectsService.delete(id);
  }
}
