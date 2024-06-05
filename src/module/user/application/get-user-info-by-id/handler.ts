import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { GetUserInfoByIdCommand } from "./command";
import { UserService } from "../../domain/user.service";
import { UserInfoDto } from "../../dto/user-info.dto";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { FailureResponseDto } from "src/common/dto/failure-response.dto";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";

@CommandHandler(GetUserInfoByIdCommand)
export class GetUserInfoByIdHandler
    implements
        ICommandHandler<
            GetUserInfoByIdCommand,
            SuccessResponseDto<UserInfoDto> | FailureResponseDto
        >
{
    constructor(private readonly userService: UserService) {}

    async execute(
        command: GetUserInfoByIdCommand
    ): Promise<SuccessResponseDto<UserInfoDto> | FailureResponseDto> {
        const { id } = command.dto;

        const user = await this.userService.getUserById(id);
        if (!user) {
            return new FailureResponseDto("USER_NOT_FOUND");
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
