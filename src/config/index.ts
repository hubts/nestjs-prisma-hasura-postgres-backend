import { DatabaseConfig } from "./database.config";
import { JwtConfig } from "./jwt.config";
import { ServerConfig } from "./server.config";
import { ThrottlerConfig } from "./throttler.config";

export const configurations = [
    ServerConfig,
    ThrottlerConfig,
    DatabaseConfig,
    JwtConfig,
];

export * from "./service";
export * from "./database.config";
export * from "./jwt.config";
export * from "./server.config";
export * from "./throttler.config";
