import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { UserEntity } from "src/entity";

export const Requestor = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest() as Request & {
            user: UserEntity;
        };
        return request.user;
    }
);
