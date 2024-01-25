import { registerAs } from "@nestjs/config";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";
import { validateConfig } from "./util";

class JwtConfigValidation {
    @IsNotEmpty()
    @IsString()
    JWT_PRIVATE_KEY: string;

    @IsNotEmpty()
    @IsString()
    JWT_PUBLIC_KEY: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    JWT_ACCESS_TOKEN_EXPIRES_IN?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    JWT_REFRESH_TOKEN_EXPIRES_IN?: number;
}

export const JwtConfig = registerAs("jwt", () => {
    validateConfig(process.env, JwtConfigValidation);

    return {
        privateKey: (process.env.JWT_PRIVATE_KEY as string)
            .replace(/\\n/gm, "\n")
            .replace(/\"/gm, ""),
        publicKey: (process.env.JWT_PUBLIC_KEY as string)
            .replace(/\\n/gm, "\n")
            .replace(/\"/gm, ""),
        accessTokenExpiresIn: parseInt(
            process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || "21600"
        ),
        refreshTokenExpiresIn: parseInt(
            process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || "86400"
        ),
    };
});
