import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdatePasswordCommand } from "./update-password.command";
import { UpdatePasswordResponseDto } from "./update-password.dto";
import { CryptoExtension } from "src/shared/util";
import { ERROR } from "src/shared/constant";
import { UserService } from "../../domain";
import { Logger } from "@nestjs/common";
import { UserEntity } from "src/entity";

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
            message: "The password has been successfully changed.",
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
