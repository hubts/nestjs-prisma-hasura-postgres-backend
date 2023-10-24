import { CACHE_MANAGER, Controller, Get, Inject } from "@nestjs/common";
import { Cache } from "cache-manager";

@Controller()
export class AppController {
    constructor(
        @Inject(CACHE_MANAGER)
        readonly cacheManager: Cache
    ) {}

    @Get("/cache")
    async getCache(): Promise<string> {
        const savedTime = await this.cacheManager.get<number>("time");
        if (savedTime) {
            return "Saved time: " + savedTime;
        }

        const now = new Date().getTime();
        await this.cacheManager.set("time", now);
        return "Save new time: " + now;
    }
}
