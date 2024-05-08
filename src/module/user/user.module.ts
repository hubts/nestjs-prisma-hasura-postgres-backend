import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./domain/user.service";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepository } from "./repository/user.repository";
import { UserProfileRepository } from "./repository/user-profile.repository";

const repositories = [UserRepository, UserProfileRepository];
const providers = [UserService, ...repositories];

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers,
    exports: providers,
})
export class UserModule {}
