export interface IRedisService {
    isAlive(): Promise<boolean>;
    count(pattern?: string): Promise<number>;
    getAllKeyValues(pattern?: string): Promise<KeyValuePair[]>;
    keyExists(key: string): Promise<boolean>;
    getOrNull(key: string): Promise<string | null>;
    expiredAt(key: string): Promise<Date>;
}

export interface KeyValuePair {
    key: string;
    value: string;
}
