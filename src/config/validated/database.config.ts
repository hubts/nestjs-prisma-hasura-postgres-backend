import { registerAs } from "@nestjs/config";
import { IDatabaseConfig } from "../config.interface";
import { ConfigValidation } from "../decorator/config-validation.decorator";
import { NotEmptyBoolean } from "../decorator/not-empty-boolean.decorator";
import { NotEmptyIntRange } from "../decorator/not-empty-int.decorator";
import { NotEmptyString } from "../decorator/not-empty-string.decorator";

export const DatabaseConfig = registerAs("database", (): IDatabaseConfig => {
    const config = new DatabaseConfigValidation();
    return {
        host: config.DB_HOST,
        port: config.DB_PORT,
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        dbname: config.DB_NAME,
        sync: config.DB_SYNC,
        logging: config.DB_LOGGING,
        schema: config.DB_SCHEMA,
    };
});

@ConfigValidation()
class DatabaseConfigValidation {
    @NotEmptyString()
    DB_HOST: string;

    @NotEmptyIntRange(0, 65535)
    DB_PORT: number;

    @NotEmptyString()
    DB_USERNAME: string;

    @NotEmptyString()
    DB_PASSWORD: string;

    @NotEmptyString()
    DB_NAME: string;

    @NotEmptyBoolean("true")
    DB_SYNC: boolean;

    @NotEmptyBoolean("true")
    DB_LOGGING: boolean;

    @NotEmptyString()
    DB_SCHEMA: string;
}
