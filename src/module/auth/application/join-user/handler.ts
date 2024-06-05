import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./command";
import { Logger } from "@nestjs/common";
import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { User } from "@prisma/client";
import { FailureResponseDto } from "src/common/dto/failure-response.dto";
import { SUCCESS_MESSAGE } from "src/shared/response/constants/success-message";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { AuthTokenDto } from "../../dto/auth-token.dto";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler
    implements
        ICommandHandler<
            JoinUserCommand,
            SuccessResponseDto<AuthTokenDto> | FailureResponseDto
        >
{
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}

    async execute(
        command: JoinUserCommand
    ): Promise<SuccessResponseDto<AuthTokenDto> | FailureResponseDto> {
        const { email, nickname, password, mobile } = command.dto;

        /** 조건부 */

        // 조건 1: 이메일, 닉네임, 모바일의 중복 여부 확인
        const duplication = await this.userService.existsBy({
            email,
            nickname,
            mobile,
        });
        if (duplication.exists) {
            switch (duplication.firstReason) {
                case "email":
                    return new FailureResponseDto("DUPLICATE_EMAIL");
                case "nickname":
                    return new FailureResponseDto("DUPLICATE_NICKNAME");
                case "mobile":
                    return new FailureResponseDto("DUPLICATE_MOBILE");
            }
        }

        /** 실행부 */

        // 유저의 새로운 회원가입은 우선적으로 수행되어도 되기 때문에, 트랜잭션을 적용하지 않는다.
        // (로그인 토큰 발행에서 발생하는 에러로 인해 유저 정보의 등록이 막히는 것보다 유저의 불편한 재입력을 제거하는 것이 낫다.)

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
        return new SuccessResponseDto(SUCCESS_MESSAGE.AUTH.JOIN_USER, {
            accessToken,
            refreshToken,
        });
    }

    log(user: User) {
        this.logger.log(
            `New user arrived: ${this.userService.summarize(user)}`
        );
    }
}
