import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { ApiErrorResponses, ApiSpec } from "src/common/decorator";
import { ERROR } from "src/shared/interface";
import { AuthRoute, AuthRouteName } from "./auth.route";
import {
    JoinUserBodyDto,
    JoinUserCommand,
    JoinUserResponseDto,
} from "../action";

@ApiTags(AuthRouteName)
@Controller(AuthRouteName)
export class AuthController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(AuthRoute.JoinUser.Name)
    @ApiSpec(JoinUserResponseDto)
    @ApiErrorResponses([
        ERROR.EMAIL_ALREADY_EXISTS,
        ERROR.NICKNAME_ALREADY_EXISTS,
    ])
    async joinUser(
        @Body() body: JoinUserBodyDto
    ): Promise<JoinUserResponseDto> {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }
}
