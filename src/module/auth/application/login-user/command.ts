import { ICommand } from "@nestjs/cqrs";
import { UserLoginDto } from "../../dto/user-login.dto";

export class LoginUserCommand implements ICommand {
    constructor(readonly dto: UserLoginDto) {}
}
