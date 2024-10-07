import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';

import { Auctions, Users } from '../database/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuctionDto } from './dtos/create-auction.dto';

@Injectable()
export class AuctionsService {
  constructor(
    @InjectRepository(Auctions)
    private auctionsRepository: Repository<Auctions>,
  ) {}

  async create(payload: CreateAuctionDto) {
    try {
      const newAuction = this.auctionsRepository.create(payload);

      await this.auctionsRepository.save(newAuction);

      return newAuction;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async participate(id: number, req: Request) {
    try {
      const auction = await this.findOneBy(id);

      const { userId } = req['user'];

      auction.users.push({ id: userId } as Users);

      await this.auctionsRepository.save(auction);

      return await this.findOneBy(id);
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }

  async findOneBy(id: number) {
    try {
      const auction = await this.auctionsRepository.findOne({
        where: { id },
        relations: { users: true },
      });

      if (!auction) {
        throw new NotFoundException(`An auction with this id:${id} not found.`);
      }

      return auction;
    } catch (error) {
      console.log(error);

      throw new HttpException(error.message, error.status);
    }
  }
}
