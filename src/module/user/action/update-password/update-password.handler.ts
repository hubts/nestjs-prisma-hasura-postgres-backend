import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePasswordCommand } from "./update-password.command";
import { UpdatePasswordResponseDto } from "./update-password.dto";
import { Logger } from "@nestjs/common";
import { FAIL, SUCCESS_MESSAGE } from "src/shared/interface";
import { FailedResponseDto } from "src/common/dto";
import { UserService } from "../../domain/user.service";
import { UserModel } from "../../domain/model/user.model";

@CommandHandler(UpdatePasswordCommand)
export class UpdatePasswordHandler
    implements ICommandHandler<UpdatePasswordCommand>
{
    private logger = new Logger(UpdatePasswordHandler.name);

    constructor(private readonly service: UserService) {}

    async execute(
        command: UpdatePasswordCommand
    ): Promise<UpdatePasswordResponseDto> {
        const user = command.user;
        const { originalPassword, newPassword } = command.body;

        // Check password
        const isPasswordCorrect = this.service.checkPassword(
            user,
            originalPassword
        );
        if (!isPasswordCorrect) {
            return new FailedResponseDto(FAIL.WRONG_PASSWORD);
        }

        // Check meaningless change
        if (originalPassword === newPassword) {
            return new FailedResponseDto(FAIL.SAME_PASSWORD);
        }

        /**
         * Process
         */
        await this.service.updatePassword(user.id, newPassword);

        this.log(user);
        return new UpdatePasswordResponseDto({
            message: SUCCESS_MESSAGE.USER.UPDATE_PASSWORD,
            data: {
                id: user.id,
            },
        });
    }

    log(userModel: UserModel) {
        this.logger.log(
            `Password successfully changed by ${this.service.summarize(
                userModel
            )}`
        );
    }
}
