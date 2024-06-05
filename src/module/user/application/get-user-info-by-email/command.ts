import { ICommand } from "@nestjs/cqrs";
import { UserEmailParam } from "../../dto/user-email.param";

export class GetUserInfoByEmailCommand implements ICommand {
    constructor(readonly dto: UserEmailParam) {}
}
