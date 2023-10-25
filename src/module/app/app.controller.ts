import { Controller, Get, Param, Query } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
    constructor(readonly appService: AppService) {}

    @Get("redis/all")
    async getRedisKeyValues() {
        return await this.appService.getRedisKeyValues();
    }

    @Get("redis/key/:key")
    async getRedisValue(@Param("key") key: string) {
        return await this.appService.getRedisValue(key);
    }

    @Get("redis/set")
    async setRedisKeyValue(
        @Query("key") key: string,
        @Query("value") value: string
    ) {
        return await this.appService.setRedisValue(key, value);
    }
}
