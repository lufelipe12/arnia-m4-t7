import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleEnum.A)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
