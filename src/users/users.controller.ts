import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { CurrentUserDto } from '../auth/dtos/current-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() payload: CreateUserDto) {
    return await this.usersService.create(payload);
  }

  @UseGuards(AuthGuard)
  @Get()
  async show() {
    return await this.usersService.show();
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@CurrentUser() currentUser: CurrentUserDto) {
    return await this.usersService.profile(currentUser);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.updateById(id, payload);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteBy(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.deleteBy(id);
  }
}
