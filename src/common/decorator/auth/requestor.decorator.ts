import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { IUser } from "src/shared/entity/user";

/**
 * Decorator used to specify who is granted access.
 */
export const Requestor = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request & {
            user: IUser;
        };
        return request.user;
    }
);
