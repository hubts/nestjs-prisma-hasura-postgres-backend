import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";

import { LoginUserCommand } from "./command";

import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { User } from "@prisma/client";
import { checkUserPassword } from "src/module/user/domain/user-password-manager";
import { FailureResponseDto } from "src/common/dto/failure-response.dto";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { AuthTokenDto } from "../../dto/auth-token.dto";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler
    implements
        ICommandHandler<
            LoginUserCommand,
            SuccessResponseDto<AuthTokenDto> | FailureResponseDto
        >
{
    private logger = new Logger(LoginUserHandler.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(
        command: LoginUserCommand
    ): Promise<SuccessResponseDto<AuthTokenDto> | FailureResponseDto> {
        const { email, password } = command.dto;

        /** 조건부 */

        // 조건 1: User 존재 확인
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return new FailureResponseDto("UNREGISTERED_EMAIL");
        }

        // 조건 2: 비밀번호 확인
        const isPasswordCorrect = checkUserPassword(user.password, password);
        if (!isPasswordCorrect) {
            return new FailureResponseDto("WRONG_PASSWORD");
        }

        /** 실행부 */

        // 실행 1: 로그인 토큰 발행
        const { accessToken, refreshToken } =
            await this.authService.issueAuthTokens(user);

        // 종료
        this.log(user);
        return new SuccessResponseDto(SUCCESS_MESSAGE.AUTH.JOIN_USER, {
            accessToken,
            refreshToken,
        });
    }

    log(user: User) {
        this.logger.log(`User login: ${this.userService.summarize(user)}`);
    }
}
