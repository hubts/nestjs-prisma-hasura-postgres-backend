import { Column, Entity, PrimaryColumn } from "typeorm";
import { ICache } from "src/infrastructure/cache/cache.interface";

@Entity("cache")
export class CacheEntity implements ICache {
    @PrimaryColumn()
    key: string;

    @Column()
    value: string;

    @Column()
    ttl: number;

    @Column({
        type: "timestamptz",
        default: "() => now()",
    })
    expiredAt: Date;
}
