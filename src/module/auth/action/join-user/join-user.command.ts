import { ICommand } from "@nestjs/cqrs";
import { JoinUserBodyDto } from "./join-user.dto";

export class JoinUserCommand implements ICommand {
    constructor(readonly body: JoinUserBodyDto) {}
}
