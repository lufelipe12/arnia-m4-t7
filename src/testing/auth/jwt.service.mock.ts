import { JwtService } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    signAsync: jest.fn(),
  },
};
