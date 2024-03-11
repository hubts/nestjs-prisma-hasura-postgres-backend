import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtConfig } from "../validated/jwt.config";
import { Algorithm } from "jsonwebtoken";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    private JWT_ALGORITHM: Algorithm = "RS256";
    private config: ConfigType<typeof JwtConfig>;

    constructor(
        @Inject(JwtConfig.KEY)
        config: ConfigType<typeof JwtConfig>
    ) {
        this.config = config;
    }

    createJwtOptions(): JwtModuleOptions {
        return {
            privateKey: this.config.privateKey,
            publicKey: this.config.publicKey,
            signOptions: {
                algorithm: this.JWT_ALGORITHM,
                expiresIn: this.config.accessTokenExpiresIn,
            },
            verifyOptions: {
                algorithms: [this.JWT_ALGORITHM],
            },
        };
    }
}
