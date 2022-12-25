import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions } from "@nestjs/throttler";

export const ThrottlerConfig = registerAs(
    "throttler",
    (): ThrottlerModuleOptions => ({
        ttl: parseInt(process.env.THROTTLER_TTL) || 60,
        limit: parseInt(process.env.THROTTLER_LIMIT) || 10,
    })
);
