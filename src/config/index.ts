import { DatabaseConfig } from "./database.config";
import { ServerConfig } from "./server.config";
import { ThrottlerConfig } from "./throttler.config";

export * from "./service";
export * from "./server.config";
export * from "./throttler.config";
export * from "./database.config";

export const configurations = [ServerConfig, ThrottlerConfig, DatabaseConfig];
