import { Injectable } from "@nestjs/common";
import { RedisService } from "src/infrastructure/redis/redis.service";

@Injectable()
export class AppService {
    constructor(private redisService: RedisService) {}

    async getRedisKeyValues() {
        return await this.redisService.getAllKeyValues();
    }

    async getRedisValue(key: string) {
        return await this.redisService.getOrNull(key);
    }

    async setRedisValue(key: string, value: string) {
        return await this.redisService.set(key, value);
    }
}
