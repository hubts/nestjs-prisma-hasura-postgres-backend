import { ICommand } from "@nestjs/cqrs";
import { IUser } from "src/shared/entity/user";
import { UpdatePasswordBodyDto } from "./body.dto";

export class UpdatePasswordCommand implements ICommand {
    constructor(readonly user: IUser, readonly body: UpdatePasswordBodyDto) {}
}
