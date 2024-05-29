import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Logger } from "@nestjs/common";
import { UpdateMobileCommand } from "./command";
import { UpdateMobileResponseDto } from "./response.dto";
import { UserService } from "../../domain/user.service";
import { User } from "@prisma/client";
import { FailureRes } from "src/common/dto/failure.res";

@CommandHandler(UpdateMobileCommand)
export class UpdateMobileHandler
    implements ICommandHandler<UpdateMobileCommand>
{
    private logger = new Logger(UpdateMobileHandler.name);

    constructor(private readonly userService: UserService) {}

    async execute(
        command: UpdateMobileCommand
    ): Promise<UpdateMobileResponseDto> {
        const { user, body } = command;
        const { mobile } = body;

        /** 조건부 */

        // 조건 1: 모바일이 이미 존재하는지 확인
        const existingUserWithMobile = await this.userService.getUserByMobile(
            mobile
        );
        if (existingUserWithMobile) {
            return new FailureRes("DUPLICATE_MOBILE");
        }
        /** 실행부 */

        // 실행 1: 모바일 업데이트
        await this.userService.updateMobile(user.id, mobile);

        // 종료
        this.log(user);
        return new UpdateMobileResponseDto();
    }

    log(user: User) {
        this.logger.log(
            `Update user mobile: ${this.userService.summarize(user)}`
        );
    }
}
