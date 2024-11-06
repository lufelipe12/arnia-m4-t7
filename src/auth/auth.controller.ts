import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { RegisterDoc } from './docs';
import { RegisterResponseDoc } from './docs/register-response.doc';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: RegisterDoc,
  })
  @ApiResponse({
    type: RegisterResponseDoc,
  })
  @Post('register')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }
}
