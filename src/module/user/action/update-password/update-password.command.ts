import { ICommand } from "@nestjs/cqrs";
import { UpdatePasswordBodyDto } from "./update-password.dto";
import { UserEntity } from "src/entity";

export class UpdatePasswordCommand implements ICommand {
    constructor(
        readonly user: UserEntity,
        readonly body: UpdatePasswordBodyDto
    ) {}
}
