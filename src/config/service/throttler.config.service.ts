import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import {
    ThrottlerModuleOptions,
    ThrottlerOptionsFactory,
} from "@nestjs/throttler";
import { ThrottlerConfig } from "../throttler.config";

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    private config: ConfigType<typeof ThrottlerConfig>;

    constructor(
        @Inject(ThrottlerConfig.KEY)
        config: ConfigType<typeof ThrottlerConfig>
    ) {
        this.config = config;
    }

    createThrottlerOptions():
        | ThrottlerModuleOptions
        | Promise<ThrottlerModuleOptions> {
        return {
            ...this.config,
        };
    }
}
