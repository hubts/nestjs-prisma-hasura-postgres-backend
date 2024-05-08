import { ICommand } from "@nestjs/cqrs";
import { JoinUserBodyDto } from "./body.dto";

export class JoinUserCommand implements ICommand {
    constructor(readonly body: JoinUserBodyDto) {}
}
