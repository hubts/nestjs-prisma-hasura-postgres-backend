import { ICommand } from "@nestjs/cqrs";
import { UserLoginDto } from "../../dto/user-login.dto";

export class DeactivateUserCommand implements ICommand {
    constructor(readonly dto: UserLoginDto) {}
}
