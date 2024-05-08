import { Injectable } from "@nestjs/common";
import { DataSource, LessThanOrEqual, Like, Repository } from "typeorm";
import { ICacheService, KeyValue } from "./cache.interface";
import { Cron, CronExpression } from "@nestjs/schedule";
import { CacheEntity } from "src/entity/common/cache.entity";
import { TimeExtension } from "src/shared/util/time-extension";

@Injectable()
export class CacheService implements ICacheService {
    private readonly cache: Repository<CacheEntity>;
    private DEFAULT_SET_TTL = 30;

    constructor(dataSource: DataSource) {
        this.cache = dataSource.getRepository(CacheEntity);
    }

    @Cron(CronExpression.EVERY_SECOND)
    private expireSchedule(): void {
        this.cache.delete({
            expiredAt: LessThanOrEqual(new Date()),
        });
    }

    async keys(pattern?: string): Promise<string[]> {
        const rows = await this.cache.find({
            select: { key: true },
            where: { key: Like(`%${pattern}%`) },
        });
        return rows.map(row => row.key);
    }

    async exists(key: string): Promise<boolean> {
        return await this.cache.exist({ where: { key } });
    }

    async count(pattern = ""): Promise<number> {
        return await this.cache.count({
            where: { key: Like(`%${pattern}%`) },
        });
    }

    async get(key: string): Promise<string | null> {
        const data = await this.cache.findOneBy({ key });
        if (!data) return null;
        return data.value;
    }

    async ttl(key: string): Promise<number> {
        const data = await this.cache.findOneBy({ key });
        if (!data) return 0;
        return data.ttl;
    }

    async expiredAt(key: string): Promise<Date> {
        const data = await this.cache.findOneBy({ key });
        if (!data) return new Date();
        return data.expiredAt;
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
        await this.cache.upsert(
            {
                key,
                value,
                ttl,
                expiredAt,
            },
            ["key"]
        );
        return expiredAt;
    }

    async del(key: string): Promise<void> {
        const data = await this.cache.findOneBy({ key });
        if (!data) return;
        await this.cache.delete(key);
    }

    async expire(key: string, ttl: number): Promise<Date> {
        const data = await this.cache.findOneBy({ key });
        if (!data) return new Date();

        const expiredAt = new Date(
            new Date().getTime() + ttl * TimeExtension.ONE_SECOND_IN_MS
        );
        await this.cache.update(data.key, {
            ttl,
            expiredAt,
        });
        return expiredAt;
    }

    async verify(key: string, expected: string): Promise<boolean> {
        const value = await this.get(key);
        return value === expected;
    }
}
