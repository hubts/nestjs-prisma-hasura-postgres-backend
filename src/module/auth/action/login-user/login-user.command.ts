import { ICommand } from "@nestjs/cqrs";
import { LoginUserBodyDto } from "./login-user.dto";

export class LoginUserCommand implements ICommand {
    constructor(readonly body: LoginUserBodyDto) {}
}
