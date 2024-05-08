import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./domain/user.service";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepository } from "./repository/user.repository";
import { UpdatePasswordHandler } from "./action/update-password/handler";

const providers = [UserService, UserRepository, UpdatePasswordHandler];

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers,
    exports: providers,
})
export class UserModule {}
