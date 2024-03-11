import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import {
    ThrottlerModuleOptions,
    ThrottlerOptionsFactory,
    seconds,
} from "@nestjs/throttler";
import { ThrottlerConfig } from "../validated/throttler.config";

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    private config: ConfigType<typeof ThrottlerConfig>;

    constructor(
        @Inject(ThrottlerConfig.KEY)
        config: ConfigType<typeof ThrottlerConfig>
    ) {
        this.config = config;
    }

    /**
     * Throttler
     * Link: https://docs.nestjs.com/security/rate-limiting
     *
     * The current version (v5) of throttler was updated with some changes.
     * > It accepts throttler options as array instead of object.
     * > It accepts 'ttl' in milliseconds. If you want to use seconds, use 'seconds' in this package.
     */
    createThrottlerOptions(): ThrottlerModuleOptions {
        return {
            throttlers: [
                {
                    ttl: seconds(this.config.ttl),
                    limit: this.config.limit,
                },
            ],
        };
    }
}
