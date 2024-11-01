import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { SubjectsService } from './subjects.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Post()
  async create(@Body() payload: CreateSubjectDto) {
    return await this.subjectsService.create(payload);
  }

  @Get()
  async find(@Query('name') name?: string) {
    return await this.subjectsService.find(name);
  }
}
