import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';

import { DriverLicensesService } from './driver-licenses.service';
import { CreateDriverLicenseDto } from './dto/create-driver-license.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('driver-licenses')
export class DriverLicensesController {
  constructor(private readonly driverLicensesService: DriverLicensesService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createDriverLicenseDto: CreateDriverLicenseDto,
    @Request() req: Request,
  ) {
    return await this.driverLicensesService.create(createDriverLicenseDto, req);
  }
}
