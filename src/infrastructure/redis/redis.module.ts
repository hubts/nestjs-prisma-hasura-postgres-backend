import { Module } from "@nestjs/common";
import { RedisService } from "./redis.service";

/**
 * Caching
 * Link: https://docs.nestjs.com/techniques/caching
 *
 * However, we choose 'ioredis' package instead of '@nestjs/cache-manager', the official package,
 * because there are version compatibility issues related to the package.
 *
 * For example, NestJS was release targeting version 4 of 'cache-manager' instead of recent v5,
 * on the other hand, 'cache-manager-redis-store' for different stores does not support redis v4.
 *
 * 'ioredis' can be used to implement features we want as a single package.
 */

@Module({
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}
