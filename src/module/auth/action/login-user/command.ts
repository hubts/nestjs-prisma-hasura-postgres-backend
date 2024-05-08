import { ICommand } from "@nestjs/cqrs";
import { LoginUserBodyDto } from "./body.dto";

export class LoginUserCommand implements ICommand {
    constructor(readonly body: LoginUserBodyDto) {}
}
