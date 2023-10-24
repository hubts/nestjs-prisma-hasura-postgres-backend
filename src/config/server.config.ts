import { registerAs } from "@nestjs/config";
import { IsEnum, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { validateConfig } from "./util/validate-config";

export const ServerConfig = registerAs("server", () => {
    validateConfig(process.env, ServerConfigValidation);

    return {
        environment: process.env.ENV as ServerEnv,
        port: parseInt(process.env.PORT || "8000"),
        isProduction: process.env.ENV === ServerEnv.PRODUCTION,
    };
});

export enum ServerEnv {
    LOCAL = "local",
    TEST = "test",
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
}

class ServerConfigValidation {
    @IsNotEmpty()
    @IsEnum(ServerEnv)
    ENV!: ServerEnv;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(65535)
    PORT!: number;
}
