import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";

import { LoginUserCommand } from "./command";
import { LoginUserResponseDto } from "./response.dto";

import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { FailureRes } from "src/common/dto/failure.res";
import { User } from "@prisma/client";
import { checkUserPassword } from "src/module/user/domain/user-password-manager";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    private logger = new Logger(LoginUserHandler.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: LoginUserCommand): Promise<LoginUserResponseDto> {
        const { email, password } = command.body;

        /** 조건부 */

        // 조건 1: User 존재 확인
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return new FailureRes("UNREGISTERED_EMAIL");
        }

        // 조건 2: 비밀번호 확인
        const isPasswordCorrect = checkUserPassword(user.password, password);
        if (!isPasswordCorrect) {
            return new FailureRes("WRONG_PASSWORD");
        }

        /** 실행부 */

        // 실행 1: 로그인 토큰 발행
        const { accessToken, refreshToken } =
            await this.authService.issueAuthTokens(user);

        // 종료
        this.log(user);
        return new LoginUserResponseDto({
            accessToken,
            refreshToken,
        });
    }

    log(user: User) {
        this.logger.log(`User login: ${this.userService.summarize(user)}`);
    }
}
