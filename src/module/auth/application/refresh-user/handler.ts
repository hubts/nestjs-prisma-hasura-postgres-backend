import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RefreshUserCommand } from "./command";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";
import { AuthTokenDto } from "../../dto/auth-token.dto";
import { UserService } from "src/module/user/domain/user.service";
import { ExpectedFailureException } from "src/common/error/exception/expected-failure.exception";
import { AuthService } from "../../domain/auth.service";
import { SUCCESS_MESSAGE } from "src/shared/response/constant/success-message";

@CommandHandler(RefreshUserCommand)
export class RefreshUserHandler
    implements
        ICommandHandler<RefreshUserCommand, SuccessResponseDto<AuthTokenDto>>
{
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(
        command: RefreshUserCommand
    ): Promise<SuccessResponseDto<AuthTokenDto>> {
        const { refreshToken, id } = command.dto;

        /**
         * Condition
         */

        // 1. Does the user exist?
        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new ExpectedFailureException("USER_NOT_FOUND");
        }

        // 2. Is the refresh token valid?
        const isValid = await this.authService.verifyRefreshToken(
            refreshToken,
            id
        );
        if (!isValid) {
            throw new ExpectedFailureException("INVALID_REFRESH_TOKEN");
        }

        /**
         * Execution
         */

        // 1. Generate a new tokens.
        const { accessToken, refreshToken: newRefreshToken } =
            this.authService.issueAuthTokens(user);

        /**
         * Returns
         */

        return new SuccessResponseDto(SUCCESS_MESSAGE.AUTH.LOGIN_USER, {
            accessToken,
            refreshToken: newRefreshToken,
        });
    }
}
