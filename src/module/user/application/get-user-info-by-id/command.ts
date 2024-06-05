import { ICommand } from "@nestjs/cqrs";
import { UserIdParam } from "../../dto/user-id.param";

export class GetUserInfoByIdCommand implements ICommand {
    constructor(readonly dto: UserIdParam) {}
}
