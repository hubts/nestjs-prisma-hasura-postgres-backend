import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { JwtConfig } from "../jwt.config";

@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
    private config: ConfigType<typeof JwtConfig>;

    constructor(
        @Inject(JwtConfig.KEY)
        config: ConfigType<typeof JwtConfig>
    ) {
        this.config = config;
    }

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            privateKey: this.config.privateKey,
            publicKey: this.config.publicKey,
            signOptions: {
                algorithm: "RS256",
                expiresIn: this.config.accessTokenExpiresIn,
            },
            verifyOptions: {
                algorithms: ["RS256"],
            },
        };
    }
}
