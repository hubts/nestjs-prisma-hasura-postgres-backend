import { ICommand } from "@nestjs/cqrs";
import { UpdatePasswordBodyDto } from "./body.dto";
import { User } from "@prisma/client";

export class UpdatePasswordCommand implements ICommand {
    constructor(readonly user: User, readonly body: UpdatePasswordBodyDto) {}
}
