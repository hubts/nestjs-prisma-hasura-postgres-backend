import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
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
import { ApiSpec } from "src/common/decorator/api/api-spec.decorator";
import { DeactivateUserCommand } from "./application/deactivate-user/command";

@ApiTags(AuthRoute.prefix)
@Controller(AuthRoute.prefix)
export class AuthController implements IAuthApi {
    constructor(private readonly commandBus: CommandBus) {}

    // Join user
    @Post(AuthRoute.subPath.joinUser.name)
    @JwtRolesAuth(AuthRoute.subPath.joinUser.roles)
    @ApiSpec({
        summary: AuthRoute.subPath.joinUser.summary,
        description: AuthRoute.subPath.joinUser.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.AUTH.JOIN_USER, AuthTokenDto, {
        status: HttpStatus.CREATED,
        description:
            "User will be created, and access and refresh tokens will be served.",
    })
    @FailureRes([
        {
            name: "DUPLICATE_EMAIL",
            description: "Email already exists",
        },
        { name: "DUPLICATE_NICKNAME", description: "Nickname already exists." },
        { name: "DUPLICATE_MOBILE", description: "Mobile already exists." },
    ])
    async joinUser(
        @Body() body: UserJoinDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new JoinUserCommand(body));
    }

    // Login user
    @Post(AuthRoute.subPath.loginUser.name)
    @JwtRolesAuth(AuthRoute.subPath.loginUser.roles)
    @ApiSpec({
        summary: AuthRoute.subPath.loginUser.summary,
        description: AuthRoute.subPath.loginUser.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.AUTH.LOGIN_USER, AuthTokenDto, {
        status: HttpStatus.CREATED,
        description: "Successful login returns access and refresh tokens.",
    })
    @FailureRes([
        { name: "UNREGISTERED_EMAIL", description: "Unknown email." },
        {
            name: "WRONG_PASSWORD",
            description: "Email and password does not match",
        },
    ])
    async loginUser(
        @Body() body: UserLoginDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new LoginUserCommand(body));
    }

    // Refresh user
    @Post(AuthRoute.subPath.refreshUser.name)
    @JwtRolesAuth(AuthRoute.subPath.refreshUser.roles)
    @ApiSpec({
        summary: AuthRoute.subPath.refreshUser.summary,
        description: AuthRoute.subPath.refreshUser.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.AUTH.LOGIN_USER, AuthTokenDto, {
        status: HttpStatus.CREATED,
        description: "New access and refresh tokens are served.",
    })
    @FailureRes([
        { name: "USER_NOT_FOUND", description: "Unknown user." },
        {
            name: "INVALID_REFRESH_TOKEN",
            description: "Incorrect refresh token.",
        },
    ])
    async refreshUser(
        @Body() body: UserRefreshDto
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        return await this.commandBus.execute(new RefreshUserCommand(body));
    }

    // Deactivate user
    @Post(AuthRoute.subPath.deactivateUser.name)
    @JwtRolesAuth(AuthRoute.subPath.deactivateUser.roles)
    @ApiSpec({
        summary: AuthRoute.subPath.deactivateUser.summary,
        description: AuthRoute.subPath.deactivateUser.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.AUTH.USER_DEACTIVATED, null, {
        status: HttpStatus.CREATED,
        description: "User will be deactivated.",
    })
    @FailureRes([
        { name: "UNREGISTERED_EMAIL", description: "Unknown email." },
        {
            name: "WRONG_PASSWORD",
            description: "Email and password does not match",
        },
    ])
    async deactivateUser(
        @Body() body: UserLoginDto
    ): Promise<SuccessResponseDto> {
        return await this.commandBus.execute(new DeactivateUserCommand(body));
    }
}
