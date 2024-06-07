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

@ApiTags(UserRoute.prefix)
@Controller(UserRoute.prefix)
export class UserController implements IUserApi {
    constructor(private readonly commandBus: CommandBus) {}

    @Get(UserRoute.subPath.getUserInfoById.name)
    @JwtRolesAuth(UserRoute.subPath.getUserInfoById.roles)
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, UserInfoDto)
    @FailureRes(["USER_NOT_FOUND"])
    async getUserInfoById(
        @Param() params: UserIdParam
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        return await this.commandBus.execute(
            new GetUserInfoByIdCommand(params)
        );
    }

    @Get(UserRoute.subPath.getUserInfoByEmail.name)
    @JwtRolesAuth(UserRoute.subPath.getUserInfoByEmail.roles)
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, UserInfoDto)
    @FailureRes(["USER_NOT_FOUND"])
    async getUserInfoByEmail(
        @Param() params: UserEmailParam
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        return await this.commandBus.execute(
            new GetUserInfoByEmailCommand(params)
        );
    }

    @Get(UserRoute.subPath.getMyInfo.name)
    @JwtRolesAuth(UserRoute.subPath.getMyInfo.roles)
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, MyUserInfoDto)
    async getMyInfo(
        @Requestor() user: User
    ): Promise<SuccessResponseDto<MyUserInfoDto>> {
        return await this.commandBus.execute(new GetMyInfoCommand(user));
    }
}
