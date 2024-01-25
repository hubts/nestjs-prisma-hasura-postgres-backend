/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./join-user.command";
import { JoinUserResponseDto } from "./join-user.dto";
import { UserService } from "src/module/user/domain";
import { ERROR } from "src/shared/constant/error.constant";
import { IUser } from "src/shared/entity";
import { UserEntity } from "src/entity";
import { Logger } from "@nestjs/common";
import { AuthService } from "../../domain";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler implements ICommandHandler<JoinUserCommand> {
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: JoinUserCommand): Promise<JoinUserResponseDto> {
        const { email, nickname, password } = command.body;

        const existingEmail = await this.userService.userRepo.exist({
            where: { email },
        });
        if (existingEmail) {
            return ERROR.EMAIL_ALREADY_EXISTS;
        }

        const existingNickname = await this.userService.userRepo.exist({
            where: { nickname },
        });
        if (existingNickname) {
            return ERROR.NICKNAME_ALREADY_EXISTS;
        }

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
        return {
            success: true,
            code: 1000,
            message: "User registration has been completed.", // Welcome
            data: {
                accessToken,
                refreshToken,
            },
        };
    }

    log(newUser: UserEntity) {
        this.logger.log(
            `User email { ${newUser.email} } is newly joined (id = ${newUser.id}).`
        );
    }
}
