import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const getUserFromReq = (context: ExecutionContext) => {
  if (context.getType() == 'http') {
    const { user } = context.switchToHttp().getRequest();

    return user;
  }
};

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => getUserFromReq(context),
);
