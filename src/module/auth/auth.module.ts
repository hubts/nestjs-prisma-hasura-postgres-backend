import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { CqrsModule } from "@nestjs/cqrs";

import { AuthController } from "./auth.controller";
import { UserModule } from "../user/user.module";
import { AuthService } from "./domain/auth.service";
import { JwtStrategy } from "./domain/jwt.strategy";
import { JoinUserHandler } from "./action/join-user/handler";
import { JwtConfigService } from "src/config/service/jwt.config.service";

const providers = [AuthService, JoinUserHandler, JwtStrategy];

@Module({
    imports: [
        CqrsModule,
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers,
})
export class AuthModule {}
