export interface ICache {
    key: string;
    value: string;
    ttl: number;
    expiredAt: Date;
}

export interface ICacheService {
    keys(): Promise<string[]>;
    exists(key: string): Promise<boolean>;
    count(pattern?: string): Promise<number>;
    get(key: string): Promise<string | null>;
    ttl(key: string): Promise<number>;
    expiredAt(key: string): Promise<Date>;
    getAllKeyValues(pattern: string): Promise<KeyValue[]>;
    set(key: string, value: string, ttl?: number): Promise<Date>;
    del(key: string): Promise<void>;
    renew(key: string, ttl: number): Promise<Date>;
    verify(key: string, expected: string): Promise<boolean>;
}

export interface KeyValue {
    key: string;
    value: string;
}
