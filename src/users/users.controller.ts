import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RoleEnum } from '../enums/role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from './dto/current-user.dto';

@UseGuards(AuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(RoleEnum.A)
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('me')
  async profile(@CurrentUser() currentUser: CurrentUserDto) {
    return await this.usersService.profile(currentUser);
  }

  @Roles(RoleEnum.A)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findOne(id);
  }

  @Patch()
  async update(
    @CurrentUser() currentUser: CurrentUserDto,
    @Body() payload: any,
  ) {
    return await this.usersService.update(currentUser.userId, payload);
  }

  @Roles(RoleEnum.A)
  @Patch(':id')
  async reactivate(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.reactivate(id);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() currentUser: CurrentUserDto,
  ) {
    return await this.usersService.delete(id, currentUser);
  }
}
