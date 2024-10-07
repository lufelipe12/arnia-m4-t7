import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuctionsService } from './auctions.service';
import { AuthGuard } from '../auth/guards/auth.guard';
import { CreateAuctionDto } from './dtos/create-auction.dto';

@UseGuards(AuthGuard)
@Controller('auctions')
export class AuctionsController {
  constructor(private readonly auctionsService: AuctionsService) {}

  @Post()
  async create(@Body() payload: CreateAuctionDto) {
    return await this.auctionsService.create(payload);
  }

  @Post(':id/participate')
  async participate(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: Request,
  ) {
    return await this.auctionsService.participate(id, req);
  }
}
