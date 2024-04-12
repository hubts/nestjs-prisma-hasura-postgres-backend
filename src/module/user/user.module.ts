import { Module } from "@nestjs/common";
import { UserController } from "./interface/user.controller";
import { UserService } from "./domain/user.service";
import { UserCommandHandlers } from "./action";
import { CqrsModule } from "@nestjs/cqrs";
import { UserRepository } from "./repository/user.repository";
import { UserProfileRepository } from "./repository/user-profile.repository";

const repositories = [UserRepository, UserProfileRepository];
const providers = [UserService, ...UserCommandHandlers, ...repositories];

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers,
    exports: providers,
})
export class UserModule {}
