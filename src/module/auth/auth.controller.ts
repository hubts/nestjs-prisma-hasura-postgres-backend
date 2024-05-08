import { ApiTags } from "@nestjs/swagger";
import { Body, Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { AuthAction, AuthRoute } from "src/shared/action/auth.action";
import { JoinUserBodyDto } from "./action/join-user/body.dto";
import { JoinUserResponseDto } from "./action/join-user/response.dto";
import { JoinUserCommand } from "./action/join-user/command";
import { FailedRes } from "src/common/decorator/api/failed-res.decorator";
import { HasuraAction } from "src/common/decorator/api/hasura-action.decorator";
import { LoginUserBodyDto } from "./action/login-user/body.dto";
import { LoginUserCommand } from "./action/login-user/command";
import { LoginUserResponseDto } from "./action/login-user/response.dto";

@ApiTags(AuthRoute.prefix)
@Controller(AuthRoute.prefix)
export class AuthController implements AuthAction {
    constructor(private readonly commandBus: CommandBus) {}

    @HasuraAction({
        method: AuthRoute.subPath.joinUser,
        successType: JoinUserResponseDto,
        transactional: true,
    })
    // @FailedRes([])
    async joinUser(@Body() body: JoinUserBodyDto) {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }

    @HasuraAction({
        method: AuthRoute.subPath.loginUser,
        successType: LoginUserResponseDto,
    })
    // @FailedRes([])
    async loginUser(@Body() body: LoginUserBodyDto) {
        return await this.commandBus.execute(new LoginUserCommand(body));
    }
}
