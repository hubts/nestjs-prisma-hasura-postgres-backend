import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";

import { LoginUserCommand } from "./login-user.command";
import { LoginUserResponseDto } from "./login-user.dto";

import { FAIL, SUCCESS_MESSAGE } from "src/shared/interface";
import { FailedResponseDto } from "src/common/dto";
import { UserService } from "src/module/user/domain/user.service";
import { UserModel } from "src/module/user/domain/model/user.model";
import { AuthService } from "../../domain/auth.service";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    private logger = new Logger(LoginUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(
        command: LoginUserCommand
    ): Promise<LoginUserResponseDto | FailedResponseDto> {
        const { email, password } = command.body;

        // Check email existence
        const userModel = await this.userService.getUserByEmail(email);
        if (!userModel) {
            return new FailedResponseDto(FAIL.UNREGISTERED_EMAIL);
        }

        // Check password
        const isPasswordCorrect = this.userService.checkPassword(
            userModel,
            password
        );
        if (!isPasswordCorrect) {
            return new FailedResponseDto(FAIL.WRONG_PASSWORD);
        }

        /**
         * Process
         */
        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(userModel);

        this.log(userModel);
        return new LoginUserResponseDto({
            message: SUCCESS_MESSAGE.AUTH.LOGIN_USER,
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    log(userModel: UserModel) {
        this.logger.log(
            `Login successful: ${this.userService.summarize(userModel)}`
        );
    }
}
