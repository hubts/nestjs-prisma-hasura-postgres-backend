import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePasswordCommand } from "./update-password.command";
import { UpdatePasswordResponseDto } from "./update-password.dto";
import { CryptoExtension } from "src/shared/util";
import { UserService } from "../../domain";
import { Logger } from "@nestjs/common";
import { UserEntity } from "src/entity";
import { ERROR, SUCCESS_MESSAGE } from "src/shared/interface";

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
        const isPasswordCorrect = CryptoExtension.comparePassword(
            originalPassword,
            user.password
        );
        if (!isPasswordCorrect) {
            return ERROR.WRONG_PASSWORD;
        }

        /**
         * Process
         */
        const updatedUser = this.service.userRepo.create({
            ...user,
            password: newPassword,
        });
        await this.service.userRepo.update(user.id, updatedUser);

        this.log(updatedUser);
        return new UpdatePasswordResponseDto({
            message: SUCCESS_MESSAGE.USER.UPDATE_PASSWORD,
            data: {
                id: user.id,
            },
        });
    }

    log(user: UserEntity) {
        this.logger.log(
            `User email { ${user.email} } changes a password newly (id = ${user.id}).`
        );
    }
}
