import { Controller, Get, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
}
