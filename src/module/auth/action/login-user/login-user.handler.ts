import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginUserCommand } from "./login-user.command";
import { LoginUserResponseDto } from "./login-user.dto";
import { Logger } from "@nestjs/common";
import { AuthService } from "../../domain";
import { UserService } from "src/module/user/domain";
import { ERROR, SUCCESS_MESSAGE } from "src/shared/interface";
import { CryptoExtension } from "src/shared/util";
import { UserEntity } from "src/entity";

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
    private logger = new Logger(LoginUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: LoginUserCommand): Promise<LoginUserResponseDto> {
        const { email, password } = command.body;

        // Check email existence
        const user = await this.userService.userRepo.findOne({
            where: { email },
        });
        if (!user) {
            return ERROR.EMAIL_NOT_FOUND;
        }

        // Check password
        const isPasswordCorrect = CryptoExtension.comparePassword(
            password,
            user.password
        );
        if (!isPasswordCorrect) {
            return ERROR.WRONG_PASSWORD;
        }

        /**
         * Process
         */
        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(user);

        this.log(user);
        return new LoginUserResponseDto({
            message: SUCCESS_MESSAGE.AUTH.LOGIN_USER,
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    log(user: UserEntity) {
        this.logger.log(
            `User email { ${user.email} } is logged in (id = ${user.id})`
        );
    }
}
