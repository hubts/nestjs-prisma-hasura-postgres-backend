import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import Redis from "ioredis";

import { RedisConfig } from "src/config";
import { IRedisService, KeyValuePair } from "./redis.service.interface";

@Injectable()
export class RedisService extends Redis implements IRedisService {
    private endpoint: string;

    constructor(
        @Inject(RedisConfig.KEY)
        config: ConfigType<typeof RedisConfig>
    ) {
        super(config);
        this.endpoint = `${config.host}:${config.port}`;
    }

    /**
     * Check the aliveness of redis.
     * @returns {Promise<boolean>} Whether the redis is alive or not.
     */
    async isAlive(): Promise<boolean> {
        try {
            const pong = await this.ping();
            return pong === "PONG";
        } catch (error) {
            throw new Error(`RedisPingError: ${error}`);
        }
    }

    /**
     * Get the number of keys stored with pattern.
     * @param pattern - Pattern to find keys (default = *).
     * @returns {Promise<number>} The number of keys found.
     */
    async count(pattern = "*"): Promise<number> {
        const allKeys = await this.keys(pattern);
        return allKeys.length;
    }

    /**
     * Get all the key-value pairs.
     * @param pattern - Pattern to find keys (default = *).
     * @returns {Promise<KeyValuePair[]>} Pairs of key-value found.
     */
    async getAllKeyValues(pattern = "*"): Promise<KeyValuePair[]> {
        const keys = await this.keys(pattern);
        const result: KeyValuePair[] = [];
        await Promise.all(
            keys.map(async key => {
                const value = await this.get(key);
                if (value) result.push({ key, value });
            })
        );
        return result;
    }

    /**
     * Check the existence of key.
     * @param {string} key - Key to find.
     * @returns {Promise<boolean>} True if the key exists, false otherwise.
     */
    async keyExists(key: string): Promise<boolean> {
        return (await this.count(key)) !== 0;
    }

    /**
     * Get a value by the key.
     * @param {string} key - Key to get a value.
     * @returns {Promise<string | null>} The value found, or null.
     */
    async getOrNull(key: string): Promise<string | null> {
        const keyExists = await this.keyExists(key);
        if (!keyExists) return null;
        return await this.get(key);
    }

    /**
     * Get the expiration date for a key.
     * @param {string} key - A key.
     * @returns {Promise<Date>} Expiration date (If a key does not exist, returns the current date).
     */
    async expiredAt(key: string): Promise<Date> {
        const hasKey = await this.keyExists(key);
        if (!hasKey) return new Date();

        const ttl = await this.ttl(key);
        const expireTimeInMs = new Date().getTime() + ttl * 1000;
        return new Date(expireTimeInMs);
    }
}
