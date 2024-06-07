import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { JoinUserCommand } from "./application/join-user/command";
import { LoginUserCommand } from "./application/login-user/command";
import { UserJoinDto } from "./dto/user-join.dto";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { JwtRolesAuth } from "src/common/decorator/auth/jwt-roles-auth.decorator";
import { SuccessRes } from "src/common/decorator/api/success-res.decorator";
import { SUCCESS_MESSAGE } from "src/shared/response/constant/success-message";
import { FailureRes } from "src/common/decorator/api/failure-res.decorator";
import { UserLoginDto } from "./dto/user-login.dto";
import { AuthRoute, IAuthApi } from "src/shared/api/auth.api";
import { UserRefreshDto } from "./dto/user-refresh.dto";
import { RefreshUserCommand } from "./application/refresh-user/command";

@ApiTags(AuthRoute.prefix)
@Controller(AuthRoute.prefix)
export class AuthController implements IAuthApi {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(AuthRoute.subPath.joinUser.name)
    @JwtRolesAuth(AuthRoute.subPath.joinUser.roles)
    @SuccessRes(SUCCESS_MESSAGE.AUTH.JOIN_USER, AuthTokenDto)
    @FailureRes(["DUPLICATE_EMAIL", "DUPLICATE_NICKNAME", "DUPLICATE_MOBILE"])
    async joinUser(
        @Body() body: UserJoinDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }

    @Post(AuthRoute.subPath.loginUser.name)
    @JwtRolesAuth(AuthRoute.subPath.loginUser.roles)
    @SuccessRes(SUCCESS_MESSAGE.AUTH.LOGIN_USER, AuthTokenDto)
    @FailureRes(["UNREGISTERED_EMAIL", "WRONG_PASSWORD"])
    async loginUser(
        @Body() body: UserLoginDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new LoginUserCommand(body));
    }

    @Post(AuthRoute.subPath.refreshUser.name)
    @JwtRolesAuth(AuthRoute.subPath.refreshUser.roles)
    @SuccessRes(SUCCESS_MESSAGE.AUTH.LOGIN_USER, AuthTokenDto)
    @FailureRes(["USER_NOT_FOUND", "INVALID_REFRESH_TOKEN"])
    async refreshUser(
        @Body() body: UserRefreshDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new RefreshUserCommand(body));
    }
}
