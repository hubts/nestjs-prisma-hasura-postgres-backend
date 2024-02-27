import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions, seconds } from "@nestjs/throttler";
import { IsInt, Min, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";
import { ConfigValidation } from "src/common/decorator";

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
        const config = new ThrottlerConfigValidation();

        return {
            throttlers: [
                {
                    ttl: seconds(config.THROTTLER_TTL),
                    limit: config.THROTTLER_LIMIT,
                },
            ],
        };
    }
);

@ConfigValidation
class ThrottlerConfigValidation {
    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_TTL: number;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_LIMIT: number;
}
