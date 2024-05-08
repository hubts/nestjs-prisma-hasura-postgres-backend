import { registerAs } from "@nestjs/config";
import { IThrottlerConfig } from "../config.interface";
import { ConfigValidation } from "../decorator/config-validation.decorator";
import { NotEmptyIntFrom } from "../decorator/not-empty-int.decorator";

export const ThrottlerConfig = registerAs("throttler", (): IThrottlerConfig => {
    const config = new ThrottlerConfigValidation();
    return {
        ttl: config.THROTTLER_TTL,
        limit: config.THROTTLER_LIMIT,
    };
});

@ConfigValidation()
class ThrottlerConfigValidation {
    @NotEmptyIntFrom(1)
    THROTTLER_TTL: number;

    @NotEmptyIntFrom(1)
    THROTTLER_LIMIT: number;
}
