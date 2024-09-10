import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  getCars() {
    return { message: 'All cars returned' };
  }
}
