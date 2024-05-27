import { JwtConfig } from "./validated/jwt.config";
import { ServerConfig } from "./validated/server.config";
import { ThrottlerConfig } from "./validated/throttler.config";

export const configurations = [ServerConfig, ThrottlerConfig, JwtConfig];
