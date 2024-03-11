import { DatabaseConfig } from "./validated/database.config";
import { JwtConfig } from "./validated/jwt.config";
import { ServerConfig } from "./validated/server.config";
import { ThrottlerConfig } from "./validated/throttler.config";

export * from "./config.interface";
export * from "./service";
export * from "./validated";

export const configurations = [
    ServerConfig,
    ThrottlerConfig,
    DatabaseConfig,
    JwtConfig,
];
