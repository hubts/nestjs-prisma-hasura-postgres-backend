/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./command";
import { JoinUserResponseDto } from "./response.dto";
import { Logger } from "@nestjs/common";
import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { IUser } from "src/shared/entity/user";
import { FailureRes } from "src/common/dto/failure.res";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler implements ICommandHandler<JoinUserCommand> {
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: JoinUserCommand): Promise<JoinUserResponseDto> {
        const { email, nickname, password, mobile } = command.body;

        /** 조건부 */

        // 조건 1: 이메일, 닉네임, 모바일의 중복 여부 확인
        const duplication = await this.userService.existsBy({
            email,
            nickname,
            mobile,
        });
        if (duplication.exists) {
            switch (duplication.reason) {
                case "email":
                    return new FailureRes("DUPLICATE_EMAIL");
                case "nickname":
                    return new FailureRes("DUPLICATE_NICKNAME");
                case "mobile":
                    return new FailureRes("DUPLICATE_MOBILE");
            }
        }

        /** 실행부 */

        // 실행 1: User 신규 생성
        const newUser = await this.userService.join({
            email,
            password,
            nickname,
            mobile,
        });

        // 실행 2: 로그인 토큰 발행
        const { accessToken, refreshToken } =
            await this.authService.issueAuthTokens(newUser);

        // 종료
        this.log(newUser);
        return new JoinUserResponseDto({
            accessToken,
            refreshToken,
        });
    }

    log(user: IUser) {
        this.logger.log(
            `New user arrived: ${this.userService.summarize(user)}`
        );
    }
}
