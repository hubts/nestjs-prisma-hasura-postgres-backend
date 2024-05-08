import { ApiTags } from "@nestjs/swagger";
import { Controller } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

// import { Transactional } from "typeorm-transactional";
import { UserRoute } from "src/shared/action/user.action";

@ApiTags()
@Controller()
export class UserController {
    constructor(private readonly commandBus: CommandBus) {}

    // @Post(UserRoute.updatePassword.name)
    // @HasuraActionHandler({
    //     permissions: UserRoute.updatePassword.permissions,
    //     responseType: UpdatePasswordResponseDto,
    // })
    // @ApiFailedRes(
    //     HttpStatus.BAD_REQUEST,
    //     FAIL.WRONG_PASSWORD,
    //     FAIL.SAME_PASSWORD
    // )
    // @Transactional()
    // async updatePassword(
    //     @Requestor() user: UserModel,
    //     @Body() body: UpdatePasswordBodyDto
    // ): Promise<UpdatePasswordResponseDto> {
    //     return await this.commandBus.execute(
    //         new UpdatePasswordCommand(user, body)
    //     );
    // }
}
