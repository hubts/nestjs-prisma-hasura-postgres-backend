import { registerAs } from "@nestjs/config";
import { IServerConfig, ServerEnv } from "../config.interface";
import { ConfigValidation } from "../decorator/config-validation.decorator";
import { NotEmptyEnum } from "../decorator/not-empty-enum.decorator";
import { NotEmptyIntRange } from "../decorator/not-empty-int.decorator";
import { NotEmptyString } from "../decorator/not-empty-string.decorator";

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
