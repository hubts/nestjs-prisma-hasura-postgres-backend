import { ApiTags } from "@nestjs/swagger";
import { Controller, Get, HttpStatus, Param } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { GetUserInfoByIdCommand } from "./application/get-user-info-by-id/command";
import { UserIdParam } from "./dto/user-id.param";
import { FailureRes } from "src/common/decorator/api/failure-res.decorator";
import { JwtRolesAuth } from "src/common/decorator/auth/jwt-roles-auth.decorator";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { UserInfoDto } from "./dto/user-info.dto";
import { SuccessRes } from "src/common/decorator/api/success-res.decorator";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";
import { IUserApi, UserRoute } from "src/shared/api/user.api";

@ApiTags(UserRoute.prefix)
@Controller(UserRoute.prefix)
export class UserController implements IUserApi {
    constructor(private readonly commandBus: CommandBus) {}

    @Get(UserRoute.subPath.getUserInfoById.name)
    @JwtRolesAuth(UserRoute.subPath.getUserInfoById.roles)
    @SuccessRes(SUCCESS_MESSAGE.USER.FOUND, UserInfoDto)
    @FailureRes(["USER_NOT_FOUND"], HttpStatus.NOT_FOUND)
    async getUserInfoById(
        @Param() params: UserIdParam
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        return await this.commandBus.execute(
            new GetUserInfoByIdCommand(params)
        );
    }
}
