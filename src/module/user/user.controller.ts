import { ApiTags } from "@nestjs/swagger";
import { Body, Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import { IUserAction, UserRoute } from "src/shared/action/user.action";
import { HasuraAction } from "src/common/decorator/api/hasura-action.decorator";
import { Requestor } from "src/common/decorator/auth/requestor.decorator";
import { UpdatePasswordCommand } from "./action/update-password/command";
import { UpdatePasswordBodyDto } from "./action/update-password/body.dto";
import { UpdatePasswordResponseDto } from "./action/update-password/response.dto";
import { FailedRes } from "src/common/decorator/api/failed-res.decorator";
import { User } from "@prisma/client";
import { UpdateMobileBodyDto } from "./action/update-mobile/body.dto";
import { UpdateMobileResponseDto } from "./action/update-mobile/response.dto";
import { UpdateMobileCommand } from "./action/update-mobile/command";

@ApiTags(UserRoute.prefix)
@Controller(UserRoute.prefix)
export class UserController implements IUserAction {
    constructor(private readonly commandBus: CommandBus) {}

    @HasuraAction({
        method: UserRoute.subPath.updatePassword,
        successType: UpdatePasswordResponseDto,
    })
    @FailedRes(["SAME_PASSWORD", "WRONG_PASSWORD"])
    async updatePassword(
        @Requestor() user: User,
        @Body() body: UpdatePasswordBodyDto
    ): Promise<UpdatePasswordResponseDto> {
        return await this.commandBus.execute(
            new UpdatePasswordCommand(user, body)
        );
    }

    @HasuraAction({
        method: UserRoute.subPath.updateMobile,
        successType: UpdateMobileResponseDto,
    })
    @FailedRes(["DUPLICATE_MOBILE"])
    async updateMobile(
        @Requestor() user: User,
        @Body() body: UpdateMobileBodyDto
    ): Promise<UpdateMobileResponseDto> {
        return await this.commandBus.execute(
            new UpdateMobileCommand(user, body)
        );
    }
}
