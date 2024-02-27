import { registerAs } from "@nestjs/config";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { Expose } from "class-transformer";
import { ConfigValidation } from "src/common/decorator";

export const JwtConfig = registerAs("jwt", () => {
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
        accessTokenExpiresIn: config.JWT_ACCESS_TOKEN_EXPIRES_IN ?? 21600,
        refreshTokenExpiresIn: config.JWT_REFRESH_TOKEN_EXPIRES_IN ?? 86400,
    };
});

@ConfigValidation
class JwtConfigValidation {
    @Expose()
    @IsNotEmpty()
    @IsString()
    JWT_PRIVATE_KEY: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    JWT_PUBLIC_KEY: string;

    @Expose()
    @IsOptional()
    @IsInt()
    @Min(1)
    JWT_ACCESS_TOKEN_EXPIRES_IN?: number;

    @Expose()
    @IsOptional()
    @IsInt()
    @Min(1)
    JWT_REFRESH_TOKEN_EXPIRES_IN?: number;
}
