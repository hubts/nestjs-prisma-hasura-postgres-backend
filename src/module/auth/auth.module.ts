import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthController } from "./interface/auth.controller";
import { AuthService, JwtStrategy } from "./domain";
import { AuthCommandHandlers } from "./action";
import { UserModule } from "../user/user.module";
import { JwtConfigService } from "src/config";

const providers = [AuthService, ...AuthCommandHandlers, JwtStrategy];

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        CqrsModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers,
})
export class AuthModule {}
