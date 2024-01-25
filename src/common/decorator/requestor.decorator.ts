import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "src/entity";

/**
 * Decorator used to specify who is granted access.
 */
export const Requestor = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request & {
            user: UserEntity;
        };
        return request.user;
    }
);
