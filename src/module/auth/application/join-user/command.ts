import { ICommand } from "@nestjs/cqrs";
import { UserJoinDto } from "../../dto/user-join.dto";

export class JoinUserCommand implements ICommand {
    constructor(readonly dto: UserJoinDto) {}
}
