import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./join-user.command";
import { JoinUserResponseDto } from "./join-user.dto";
import { Logger } from "@nestjs/common";
import { FAIL, SUCCESS_MESSAGE } from "src/shared/interface";
import { FailedResponseDto } from "src/common/dto";
import { UserService } from "src/module/user/domain/user.service";
import { UserModel } from "src/module/user/domain/model/user.model";
import { AuthService } from "../../domain/auth.service";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler implements ICommandHandler<JoinUserCommand> {
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: JoinUserCommand): Promise<JoinUserResponseDto> {
        const { email, nickname, password, mobile } = command.body;

        const duplicationCheck = await this.userService.existsBy({
            email,
            nickname,
            mobile,
        });
        if (duplicationCheck.exists) {
            switch (duplicationCheck.reason) {
                case "email":
                    return new FailedResponseDto(FAIL.DUPLICATE_EMAIL);
                case "nickname":
                    return new FailedResponseDto(FAIL.DUPLICATE_NICKNAME);
                case "mobile":
                    return new FailedResponseDto(FAIL.DUPLICATE_MOBILE);
            }
        }

        /**
         * Process
         */
        const newUserModel = await this.userService.createUser({
            email,
            password,
            nickname,
            mobile,
        });

        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(newUserModel);

        this.log(newUserModel);
        return new JoinUserResponseDto({
            message: SUCCESS_MESSAGE.AUTH.JOIN_USER,
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    log(userModel: UserModel) {
        this.logger.log(
            `A new user is newly joined: ${this.userService.summarize(
                userModel
            )}`
        );
    }
}
