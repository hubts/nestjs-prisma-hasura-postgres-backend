import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePasswordCommand } from "./command";
import { Logger } from "@nestjs/common";
import { UpdatePasswordResponseDto } from "./response.dto";
import { UserService } from "../../domain/user.service";
import { FailedResponseDto } from "src/common/dto/failed.response.dto";
import { checkPassword } from "../../domain/check-password";
import { IUser } from "src/shared/entity/user";

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
    implements ICommandHandler<UpdatePasswordCommand>
{
    private logger = new Logger(UpdatePasswordHandler.name);

    constructor(private readonly userService: UserService) {}

    async execute(
        command: UpdatePasswordCommand
    ): Promise<UpdatePasswordResponseDto> {
        const { user, body } = command;
        const { originalPassword, newPassword } = body;

        /** 조건부 */

        // 조건 1: 기존 비밀번호와 동일 여부 확인
        if (originalPassword === newPassword) {
            return new FailedResponseDto("SAME_PASSWORD");
        }

        // 조건 2: 비밀번호 확인
        const isPasswordCorrect = checkPassword(
            user.password,
            originalPassword
        );
        if (!isPasswordCorrect) {
            return new FailedResponseDto("WRONG_PASSWORD");
        }

        /** 실행부 */

        // 실행 1: 비밀번호 업데이트
        await this.userService.updatePassword(user.id, newPassword);

        // 종료
        this.log(user);
        return new UpdatePasswordResponseDto();
    }

    log(user: IUser) {
        this.logger.log(
            `Update user password: ${this.userService.summarize(user)}`
        );
    }
}
