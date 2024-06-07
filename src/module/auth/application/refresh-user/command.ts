import { ICommand } from "@nestjs/cqrs";
import { UserRefreshDto } from "../../dto/user-refresh.dto";

export class RefreshUserCommand implements ICommand {
    constructor(readonly dto: UserRefreshDto) {}
}
