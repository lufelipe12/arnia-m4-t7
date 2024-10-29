import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      request['user'] = tokenPayload;
    } catch (error) {
      console.error(error);

      throw new UnauthorizedException('Not valid token.');
    }

    return true;
  }

  private getTokenFromHeader(request: Request) {
    const { headers } = request;

    const [type, token] = headers?.authorization?.split(' ') || [];

    return type === 'Bearer' ? token : null;
  }
}
