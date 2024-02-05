import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { ApiFailedRes, ApiSpec } from "src/common/decorator";
import { AuthRoute, AuthRouteName } from "./auth.route";
import {
    JoinUserBodyDto,
    JoinUserCommand,
    JoinUserResponseDto,
    LoginUserBodyDto,
    LoginUserCommand,
    LoginUserResponseDto,
} from "../action";
import { FAIL } from "src/shared/interface";

@ApiTags(AuthRouteName)
@Controller(AuthRouteName)
export class AuthController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(AuthRoute.JoinUser.Name)
    @ApiSpec(JoinUserResponseDto)
    @ApiFailedRes(
        HttpStatus.BAD_REQUEST,
        FAIL.DUPLICATE_EMAIL,
        FAIL.DUPLICATE_NICKNAME
    )
    async joinUser(
        @Body() body: JoinUserBodyDto
    ): Promise<JoinUserResponseDto> {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }

    @Post(AuthRoute.LoginUser.Name)
    @ApiSpec(LoginUserResponseDto)
    @ApiFailedRes(
        HttpStatus.BAD_REQUEST,
        FAIL.UNREGISTERED_EMAIL,
        FAIL.WRONG_PASSWORD
    )
    async loginUser(
        @Body() body: LoginUserBodyDto
    ): Promise<LoginUserResponseDto> {
        return await this.commandBus.execute(new LoginUserCommand(body));
    }
}
