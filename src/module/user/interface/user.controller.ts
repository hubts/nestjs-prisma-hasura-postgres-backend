import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

import {
    ApiFailedRes,
    HasuraActionHandler,
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
import { Transactional } from "typeorm-transactional";

@ApiTags(UserRouteName)
@Controller(UserRouteName)
export class UserController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post(UserRoute.updatePassword.name)
    @HasuraActionHandler({
        permissions: UserRoute.updatePassword.permissions,
        responseType: UpdatePasswordResponseDto,
    })
    @ApiFailedRes(
        HttpStatus.BAD_REQUEST,
        FAIL.WRONG_PASSWORD,
        FAIL.SAME_PASSWORD
    )
    @Transactional()
    async updatePassword(
        @Requestor() user: UserEntity,
        @Body() body: UpdatePasswordBodyDto
    ): Promise<UpdatePasswordResponseDto> {
        return await this.commandBus.execute(
            new UpdatePasswordCommand(user, body)
        );
    }
}
