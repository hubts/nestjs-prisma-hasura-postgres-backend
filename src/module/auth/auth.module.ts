import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./domain/auth.service";
import { JwtStrategy } from "./domain/jwt.strategy";
import { JoinUserHandler } from "./application/join-user/handler";
import { JwtConfigService } from "src/config/service/jwt.config.service";
import { LoginUserHandler } from "./application/login-user/handler";
import { UserModule } from "../user/user.module";
import { RefreshUserHandler } from "./application/refresh-user/handler";

const providers = [
    AuthService,
    JwtStrategy,
    JoinUserHandler,
    LoginUserHandler,
    RefreshUserHandler,
];

@Module({
    imports: [
        JwtModule.registerAsync({
            useClass: JwtConfigService,
        }),
        UserModule,
    ],
    controllers: [AuthController],
    providers,
})
export class AuthModule {}
