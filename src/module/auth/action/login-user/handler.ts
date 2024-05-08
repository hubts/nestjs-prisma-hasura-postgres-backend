import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";

import { LoginUserCommand } from "./command";
import { LoginUserResponseDto } from "./response.dto";

import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { FailedResponseDto } from "src/common/dto/failed.response.dto";
import { IUser } from "src/shared/entity/user";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    private logger = new Logger(LoginUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: LoginUserCommand): Promise<LoginUserResponseDto> {
        const { email } = command.body;

        // Check email existence
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            return new FailedResponseDto("DUPLICATE_EMAIL");
        }

        // // Check password
        // const isPasswordCorrect = this.userService.checkPassword(
        //     user,
        //     password
        // );
        // if (!isPasswordCorrect) {
        //     return new FailedResponseDto("WRONG_PASSWORD");
        // }

        /**
         * Process
         */
        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(user);

        this.log(user);
        return new LoginUserResponseDto({
            accessToken,
            refreshToken,
        });
    }

    log(user: IUser) {
        this.logger.log(
            `Login successful: ${this.userService.summarize(user)}`
        );
    }
}
