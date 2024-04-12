import { ICommand } from "@nestjs/cqrs";
import { UpdatePasswordBodyDto } from "./update-password.dto";
import { UserModel } from "../../domain/model/user.model";

export class UpdatePasswordCommand implements ICommand {
    constructor(
        readonly user: UserModel,
        readonly body: UpdatePasswordBodyDto
    ) {}
}
