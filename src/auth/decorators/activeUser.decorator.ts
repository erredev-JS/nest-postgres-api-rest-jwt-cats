// active-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserActiveInterface } from '../types/userActive.interface';

export const ActiveUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserActiveInterface => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
