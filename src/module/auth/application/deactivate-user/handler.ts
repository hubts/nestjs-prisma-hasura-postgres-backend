import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DeactivateUserCommand } from "./command";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { Logger } from "@nestjs/common";
import { AuthService } from "../../domain/auth.service";
import { UserService } from "src/module/user/domain/user.service";
import { ExpectedFailureException } from "src/common/error/exception/expected-failure.exception";
import { checkUserPassword } from "src/module/user/domain/user-password-manager";
import { User } from "@prisma/client";
import { SUCCESS_MESSAGE } from "src/shared/response/constant/success-message";

@CommandHandler(DeactivateUserCommand)
export class DeactivateUserHandler
    implements ICommandHandler<DeactivateUserCommand, SuccessResponseDto<void>>
{
    private logger = new Logger(DeactivateUserHandler.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(
        command: DeactivateUserCommand
    ): Promise<SuccessResponseDto<void>> {
        const { email, password } = command.dto;

        /** 조건부 */

        // 조건 1: User 존재 확인
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new ExpectedFailureException("UNREGISTERED_EMAIL");
        }

        // 조건 2: 비밀번호 확인
        const isPasswordCorrect = checkUserPassword(user.password, password);
        if (!isPasswordCorrect) {
            throw new ExpectedFailureException("WRONG_PASSWORD");
        }

        /** 실행부 */

        // 실행 1: 유저 비활성화(Soft-delete)
        const result = await this.userService.deactivate(user.id);
        console.log("result", result);

        // 종료
        this.log(user);
        return new SuccessResponseDto(SUCCESS_MESSAGE.AUTH.USER_DEACTIVATED);
    }

    log(user: User) {
        this.logger.log(
            `User deactivated: ${this.userService.summarize(user)}`
        );
    }
}
