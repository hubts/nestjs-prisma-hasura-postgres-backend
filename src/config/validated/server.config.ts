import { registerAs } from "@nestjs/config";
import { IServerConfig, ServerEnv } from "../config.interface";
import {
    ConfigValidation,
    NotEmptyEnum,
    NotEmptyIntRange,
    NotEmptyString,
} from "../decorator";

export const ServerConfig = registerAs("server", (): IServerConfig => {
    const config = new ServerConfigValidation();
    return {
        env: config.ENV,
        port: config.PORT,
        externalEndpoint: config.EXTERNAL_ENDPOINT,
        isProduction: config.ENV === ServerEnv.PRODUCTION,
    };
});

@ConfigValidation()
class ServerConfigValidation {
    @NotEmptyEnum(ServerEnv)
    ENV: ServerEnv;

    @NotEmptyIntRange(0, 65535)
    PORT: number;

    @NotEmptyString()
    EXTERNAL_ENDPOINT: string;
}
