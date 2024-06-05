import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GetMyInfoCommand } from "./command";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { MyUserInfoDto } from "../../dto/my-info.dto";
import { UserService } from "../../domain/user.service";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";
import { ExpectedFailureException } from "src/common/error/exception/expected-failure.exception";

@CommandHandler(GetMyInfoCommand)
export class GetMyInfoHandler
    implements
        ICommandHandler<GetMyInfoCommand, SuccessResponseDto<MyUserInfoDto>>
{
    constructor(private readonly userService: UserService) {}

    async execute(
        command: GetMyInfoCommand
    ): Promise<SuccessResponseDto<MyUserInfoDto>> {
        const { id } = command.user;

        const user = await this.userService.getUserWithProfileById(id);
        if (!user || !user.Profile) {
            throw new ExpectedFailureException("UNEXPECTED_ERROR");
        }

        return new SuccessResponseDto(SUCCESS_MESSAGE.USER.FOUND, {
            user: {
                id: user.id,
                joinedAt: user.createdAt,
                email: user.email,
                nickname: user.nickname,
                mobile: user.Profile.mobile,
            },
        });
    }
}
