import { ICommand } from "@nestjs/cqrs";
import { User } from "@prisma/client";
import { UpdateMobileBodyDto } from "./body.dto";

export class UpdateMobileCommand implements ICommand {
    constructor(readonly user: User, readonly body: UpdateMobileBodyDto) {}
}
