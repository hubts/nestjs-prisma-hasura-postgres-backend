import { Module } from "@nestjs/common";
import { UserController } from "./interface/user.controller";
import { UserService } from "./domain/user.service";
import { UserCommandHandlers } from "./action";
import { CqrsModule } from "@nestjs/cqrs";

const providers = [UserService, ...UserCommandHandlers];

@Module({
    imports: [CqrsModule],
    controllers: [UserController],
    providers,
    exports: providers,
})
export class UserModule {}
