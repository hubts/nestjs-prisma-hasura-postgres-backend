import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";

import { CacheRepository } from "./cache.repository";
import { ICacheService, KeyValue } from "./cache.interface";
import { TimeExtension } from "src/shared/util/time-extension";

@Injectable()
export class CacheService implements ICacheService {
    private DEFAULT_SET_TTL = 30;

    constructor(private cache: CacheRepository) {}

    @Cron(CronExpression.EVERY_SECOND)
    private expireSchedule(): void {
        this.cache.expire();
    }

    async keys(pattern?: string): Promise<string[]> {
        const rows = await this.cache.findKeys(pattern);
        return rows.map(row => row.key);
    }

    async exists(key: string): Promise<boolean> {
        return await this.cache.exist(key);
    }

    async count(pattern?: string): Promise<number> {
        return await this.cache.count(pattern);
    }

    async get(key: string): Promise<string | null> {
        const result = await this.cache.findValue(key);
        if (!result) return null;
        return result.value;
    }

    async ttl(key: string): Promise<number> {
        const result = await this.cache.findValue(key);
        if (!result) return 0;
        return result.ttl;
    }

    async expiredAt(key: string): Promise<Date> {
        const result = await this.cache.findValue(key);
        if (!result) return new Date();
        return result.expiredAt;
    }

    async getAllKeyValues(pattern = ""): Promise<KeyValue[]> {
        const keys = await this.keys(pattern);
        const result: KeyValue[] = [];
        for (const key of keys) {
            const value = await this.get(key);
            if (value) {
                result.push({ key, value });
            }
        }
        return result;
    }

    async set(key: string, value: string, ttl?: number): Promise<Date> {
        ttl ??= this.DEFAULT_SET_TTL; // Default: 30 seconds
        const expiredAt = new Date(
            new Date().getTime() + ttl * TimeExtension.ONE_SECOND_IN_MS
        );
        await this.cache.upsert({
            key,
            value,
            ttl,
            expiredAt,
        });
        return expiredAt;
    }

    async del(key: string): Promise<void> {
        await this.cache.delete(key);
    }

    async renew(key: string, ttl: number): Promise<Date> {
        const data = await this.cache.findValue(key);
        if (!data) return new Date();

        const expiredAt = new Date(
            new Date().getTime() + ttl * TimeExtension.ONE_SECOND_IN_MS
        );
        await this.cache.renew(data.key, ttl, expiredAt);
        return expiredAt;
    }

    async verify(key: string, expected: string): Promise<boolean> {
        const value = await this.get(key);
        return value === expected;
    }
}
