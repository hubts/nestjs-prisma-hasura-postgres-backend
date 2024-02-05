import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./join-user.command";
import { JoinUserResponseDto } from "./join-user.dto";
import { UserService } from "src/module/user/domain";
import { IUser } from "src/shared/entity";
import { UserEntity } from "src/entity";
import { Logger } from "@nestjs/common";
import { AuthService } from "../../domain";
import { FAIL, SUCCESS_MESSAGE } from "src/shared/interface";
import { FailedResponseDto } from "src/common/dto";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler implements ICommandHandler<JoinUserCommand> {
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: JoinUserCommand): Promise<JoinUserResponseDto> {
        const { email, nickname, password } = command.body;

        // Check email duplication
        const existingEmail = await this.userService.userRepo.exist({
            where: { email },
        });
        if (existingEmail) {
            return new FailedResponseDto(FAIL.DUPLICATE_EMAIL);
        }

        // Check nickname duplication
        const existingNickname = await this.userService.userRepo.exist({
            where: { nickname },
        });
        if (existingNickname) {
            return new FailedResponseDto(FAIL.DUPLICATE_NICKNAME);
        }

        /**
         * Process
         */
        const newUser: IUser = {
            email,
            nickname,
            password,
        };
        const createdUser = this.userService.userRepo.create(newUser);
        const savedUser = await this.userService.userRepo.save(createdUser);

        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(savedUser);

        this.log(savedUser);
        return new JoinUserResponseDto({
            message: SUCCESS_MESSAGE.AUTH.JOIN_USER,
            data: {
                accessToken,
                refreshToken,
            },
        });
    }

    log(newUser: UserEntity) {
        this.logger.log(
            `User email { ${newUser.email} } is newly joined (id = ${newUser.id}).`
        );
    }
}
