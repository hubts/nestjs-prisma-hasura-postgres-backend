import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GetUserInfoByEmailCommand } from "./command";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { UserInfoDto } from "../../dto/user-info.dto";
import { UserService } from "../../domain/user.service";
import { ExpectedFailureException } from "src/common/error/exception/expected-failure.exception";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";

@CommandHandler(GetUserInfoByEmailCommand)
export class GetUserInfoByEmailHandler
    implements
        ICommandHandler<
            GetUserInfoByEmailCommand,
            SuccessResponseDto<UserInfoDto>
        >
{
    constructor(private readonly userService: UserService) {}

    async execute(
        command: GetUserInfoByEmailCommand
    ): Promise<SuccessResponseDto<UserInfoDto>> {
        const { email } = command.dto;

        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new ExpectedFailureException("USER_NOT_FOUND");
        }

        return new SuccessResponseDto(SUCCESS_MESSAGE.USER.FOUND, {
            user: {
                id: user.id,
                joinedAt: user.createdAt,
                email: user.email,
                nickname: user.nickname,
            },
        });
    }
}
