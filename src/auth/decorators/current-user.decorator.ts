import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    if (ctx.getType() === 'http') {
      const request = ctx.switchToHttp().getRequest();

      return request.user;
    }
  },
);
