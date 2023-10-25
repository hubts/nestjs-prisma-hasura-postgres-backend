import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions, seconds } from "@nestjs/throttler";
import { IsInt, Min, IsNotEmpty } from "class-validator";
import { validateConfig } from "./util/validate-config";

/**
 * Throttler
 * Link: https://docs.nestjs.com/security/rate-limiting
 *
 * The current version (v5) of throttler was updated with some changes.
 * > It accepts throttler options as array instead of object.
 * > It accepts 'ttl' in milliseconds. If you want to use seconds, use 'seconds' in this package.
 */

export const ThrottlerConfig = registerAs(
    "throttler",
    (): ThrottlerModuleOptions => {
        validateConfig(process.env, ThrottlerConfigValidation);

        return {
            throttlers: [
                {
                    ttl: seconds(parseInt(process.env.THROTTLER_TTL || "60")),
                    limit: parseInt(process.env.THROTTLER_LIMIT || "1000"),
                },
            ],
        };
    }
);

class ThrottlerConfigValidation {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_TTL?: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_LIMIT?: number;
}
