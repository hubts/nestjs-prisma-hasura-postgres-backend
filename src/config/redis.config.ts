import { registerAs } from "@nestjs/config";
import { validateConfig } from "./util";
import { RedisOptions } from "ioredis";
import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    Min,
} from "class-validator";

export const RedisConfig = registerAs("redis", (): RedisOptions => {
    validateConfig(process.env, RedisConfigValidation);

    return {
        host: process.env.REDIS_HOST as string,
        port: parseInt(process.env.REDIS_PORT as string),
        password: process.env.REDIS_PASSWORD || "",
        db: parseInt(process.env.REDIS_DB || "0"),
        lazyConnect: true,
        connectTimeout: 30000, // 30 seconds timeout
        // retryStrategy(times: number): number {
        //     const delay = times * 50 < 2000 ? times * 50 : 2000;
        //     return delay;
        // },
    };
});

class RedisConfigValidation {
    @IsNotEmpty()
    @IsString()
    REDIS_HOST!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(65535)
    REDIS_PORT!: number;

    @IsOptional()
    @IsString()
    REDIS_PASSWORD?: string;

    @IsOptional()
    @IsInt()
    REDIS_DB?: string;
}
