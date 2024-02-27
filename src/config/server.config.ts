import { registerAs } from "@nestjs/config";
import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { Expose } from "class-transformer";
import { ConfigValidation } from "src/common/decorator";

export enum ServerEnv {
    LOCAL = "local",
    TEST = "test",
    DEVELOPMENT = "development",
    STAGING = "staging",
    PRODUCTION = "production",
}

export const ServerConfig = registerAs("server", () => {
    const config = new ServerConfigValidation();

    return {
        environment: config.ENV,
        port: config.PORT,
        isProduction: config.ENV === ServerEnv.PRODUCTION,
        externalEndpoint: config.EXTERNAL_ENDPOINT as string,
    };
});

@ConfigValidation
class ServerConfigValidation {
    @Expose()
    @IsNotEmpty()
    @IsEnum(ServerEnv)
    ENV: ServerEnv;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(65535)
    PORT: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    EXTERNAL_ENDPOINT: string;
}
