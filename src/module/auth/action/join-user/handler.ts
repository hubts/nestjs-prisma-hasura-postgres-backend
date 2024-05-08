/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { JoinUserCommand } from "./command";
import { JoinUserResponseDto } from "./response.dto";
import { Logger } from "@nestjs/common";
import { UserService } from "src/module/user/domain/user.service";
import { AuthService } from "../../domain/auth.service";
import { IUser } from "src/shared/entity/user";
import { createUser } from "src/module/user/domain/create-user";
import { UserRepository } from "src/module/user/repository/user.repository";
import { FailedResponseDto } from "src/common/dto/failed.response.dto";

@CommandHandler(JoinUserCommand)
export class JoinUserHandler implements ICommandHandler<JoinUserCommand> {
    private logger = new Logger(JoinUserHandler.name);

    constructor(
        private readonly userRepo: UserRepository,
        private readonly service: AuthService,
        private readonly userService: UserService
    ) {}

    async execute(command: JoinUserCommand): Promise<JoinUserResponseDto> {
        const { email, nickname, password, mobile } = command.body;

        // 조건 1: 이메일, 닉네임, 모바일의 중복 여부 확인
        const duplicateUsers = await this.userService.duplicationExistsBy({
            email,
            nickname,
            mobile,
        });
        console.log("duplicationCheck", duplicateUsers);
        if (duplicateUsers.length) {
            if (duplicateUsers.find(user => user.email === email)) {
                return new FailedResponseDto("DUPLICATE_EMAIL");
            } else if (
                duplicateUsers.find(user => user.nickname === nickname)
            ) {
                return new FailedResponseDto("");
            } else {
                return new FailedResponseDto("");
            }
        }

        // const duplicationCheck = await this.userService.existsBy({
        //     email,
        //     nickname,
        //     mobile,
        // });
        // if (duplicationCheck.exists) {
        //     switch (duplicationCheck.reason) {
        //         case "email":
        //             return new FailedResponseDto("DUPLICATE_EMAIL");
        //         // case "nickname":
        //         //     return new FailedResponseDto();
        //         // case "mobile":
        //         //     return new FailedResponseDto(FAIL.DUPLICATE_MOBILE);
        //     }
        // }

        /**
         * Process
         */
        const newUser = createUser({
            email,
            password,
            nickname,
            mobile,
        });
        console.log("newUser", newUser);
        await this.userRepo.save(newUser);

        const { accessToken, refreshToken } =
            await this.service.issueAuthTokens(newUser);

        this.log(newUser);
        return new JoinUserResponseDto({
            accessToken,
            refreshToken,
        });
    }

    log(user: IUser) {
        this.logger.log(
            `A new user is newly joined: ${this.userService.summarize(user)}`
        );
    }
}
