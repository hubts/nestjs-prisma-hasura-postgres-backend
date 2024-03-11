import { registerAs } from "@nestjs/config";
import { IJwtConfig } from "../config.interface";
import {
    ConfigValidation,
    NotEmptyIntFrom,
    NotEmptyString,
} from "../decorator";

export const JwtConfig = registerAs("jwt", (): IJwtConfig => {
    const config = new JwtConfigValidation();
    return {
        privateKey: config.JWT_PRIVATE_KEY.replace(/\\n/gm, "\n").replace(
            /\"/gm,
            ""
        ),
        publicKey: config.JWT_PUBLIC_KEY.replace(/\\n/gm, "\n").replace(
            /\"/gm,
            ""
        ),
        accessTokenExpiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN,
        refreshTokenExpiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    };
});

@ConfigValidation()
class JwtConfigValidation {
    @NotEmptyString()
    JWT_PRIVATE_KEY: string;

    @NotEmptyString()
    JWT_PUBLIC_KEY: string;

    @NotEmptyIntFrom(1)
    JWT_ACCESS_TOKEN_EXPIRES_IN: number;

    @NotEmptyIntFrom(1)
    JWT_REFRESH_TOKEN_EXPIRES_IN: number;
}
