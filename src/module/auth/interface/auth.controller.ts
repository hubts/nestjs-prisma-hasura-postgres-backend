import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { ApiSpec } from "src/common/decorator";
import { AuthRoute, AuthRouteName } from "./auth.route";
import {
    JoinUserBodyDto,
    JoinUserCommand,
    JoinUserResponseDto,
    LoginUserBodyDto,
    LoginUserCommand,
    LoginUserResponseDto,
} from "../action";

@ApiTags(AuthRouteName)
@Controller(AuthRouteName)
export class AuthController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(AuthRoute.JoinUser.Name)
    @ApiSpec(JoinUserResponseDto)
    // @ApiErrorResponses([
    //     ERROR.EMAIL_ALREADY_EXISTS,
    //     ERROR.NICKNAME_ALREADY_EXISTS,
    // ])
    async joinUser(
        @Body() body: JoinUserBodyDto
    ): Promise<JoinUserResponseDto> {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }

    @Post(AuthRoute.LoginUser.Name)
    @ApiSpec(LoginUserResponseDto)
    // @ApiErrorResponses([ERROR.EMAIL_NOT_FOUND, ERROR.WRONG_PASSWORD])
    async loginUser(
        @Body() body: LoginUserBodyDto
    ): Promise<LoginUserResponseDto> {
        return await this.commandBus.execute(new LoginUserCommand(body));
    }
}
