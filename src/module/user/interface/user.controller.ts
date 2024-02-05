import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import {
    ApiFailedRes,
    ApiSpec,
    JwtRolesAuth,
    Requestor,
} from "src/common/decorator";
import { UserEntity } from "src/entity";
import { UserRoute, UserRouteName } from "./user.route";
import {
    UpdatePasswordBodyDto,
    UpdatePasswordCommand,
    UpdatePasswordResponseDto,
} from "../action";
import { FAIL } from "src/shared/interface";

@ApiTags(UserRouteName)
@Controller(UserRouteName)
export class UserController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(UserRoute.UpdatePassword.Name)
    @JwtRolesAuth(...UserRoute.UpdatePassword.Permission)
    @ApiSpec(UpdatePasswordResponseDto)
    @ApiFailedRes(
        HttpStatus.BAD_REQUEST,
        FAIL.WRONG_PASSWORD,
        FAIL.SAME_PASSWORD
    )
    async updatePassword(
        @Requestor() user: UserEntity,
        @Body() body: UpdatePasswordBodyDto
    ): Promise<UpdatePasswordResponseDto> {
        return await this.commandBus.execute(
            new UpdatePasswordCommand(user, body)
        );
    }
}
