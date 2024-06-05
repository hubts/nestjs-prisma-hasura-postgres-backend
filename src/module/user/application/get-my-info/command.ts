import { ICommand } from "@nestjs/cqrs";
import { User } from "@prisma/client";

export class GetMyInfoCommand implements ICommand {
    constructor(readonly user: User) {}
}
