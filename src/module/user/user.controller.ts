import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { GetUserInfoByIdCommand } from "./application/get-user-info-by-id/command";
import { UserIdParam } from "./dto/user-id.param";
import { FailureRes } from "src/common/decorator/api/failure-res.decorator";
import { JwtRolesAuth } from "src/common/decorator/auth/jwt-roles-auth.decorator";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { UserInfoDto } from "./dto/user-info.dto";
import { SuccessRes } from "src/common/decorator/api/success-res.decorator";
import { SUCCESS_MESSAGE } from "src/shared/response/constant/success-message";
import { IUserApi, UserRoute } from "src/shared/api/user.api";
import { Requestor } from "src/common/decorator/auth/requestor.decorator";
import { User } from "@prisma/client";
import { UserEmailParam } from "./dto/user-email.param";
import { GetUserInfoByEmailCommand } from "./application/get-user-info-by-email/command";
import { MyUserInfoDto } from "./dto/my-info.dto";
import { GetMyInfoCommand } from "./application/get-my-info/command";
import { ApiSpec } from "src/common/decorator/api/api-spec.decorator";

@ApiTags(UserRoute.prefix)
@Controller(UserRoute.prefix)
export class UserController implements IUserApi {
    constructor(private readonly commandBus: CommandBus) {}

    @Get(UserRoute.subPath.getUserInfoById.name)
    @JwtRolesAuth(UserRoute.subPath.getUserInfoById.roles)
    @ApiSpec({
        summary: UserRoute.subPath.getUserInfoById.summary,
        description: UserRoute.subPath.getUserInfoById.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, UserInfoDto, {
        description: "Get public information of user by ID.",
    })
    @FailureRes([
        { name: "USER_NOT_FOUND", description: "If user does not exist." },
    ])
    async getUserInfoById(
        @Param() params: UserIdParam
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        return await this.commandBus.execute(
            new GetUserInfoByIdCommand(params)
        );
    }

    @Get(UserRoute.subPath.getUserInfoByEmail.name)
    @JwtRolesAuth(UserRoute.subPath.getUserInfoByEmail.roles)
    @ApiSpec({
        summary: UserRoute.subPath.getUserInfoByEmail.summary,
        description: UserRoute.subPath.getUserInfoByEmail.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, UserInfoDto, {
        description: "Get public information of user by email.",
    })
    @FailureRes([
        { name: "USER_NOT_FOUND", description: "If user does not exist." },
    ])
    async getUserInfoByEmail(
        @Param() params: UserEmailParam
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        return await this.commandBus.execute(
            new GetUserInfoByEmailCommand(params)
        );
    }

    @Get(UserRoute.subPath.getMyInfo.name)
    @JwtRolesAuth(UserRoute.subPath.getMyInfo.roles)
    @ApiSpec({
        summary: UserRoute.subPath.getMyInfo.summary,
        description: UserRoute.subPath.getMyInfo.description,
    })
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, MyUserInfoDto, {
        description: "Get my user information.",
    })
    async getMyInfo(
        @Requestor() user: User
    ): Promise<SuccessResponseDto<MyUserInfoDto>> {
        return await this.commandBus.execute(new GetMyInfoCommand(user));
    }
}
