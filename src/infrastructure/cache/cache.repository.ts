import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cache } from "@prisma/client";

@Injectable()
export class CacheRepository {
    constructor(private prisma: PrismaService) {}

    async expire(timestamptz?: Date): Promise<number> {
        const deadline = timestamptz ?? new Date();
        return (
            await this.prisma.cache.deleteMany({
                where: {
                    expiredAt: {
                        lte: deadline,
                    },
                },
            })
        ).count;
    }

    async delete(key: string): Promise<void> {
        await this.prisma.cache.delete({
            where: {
                key,
            },
        });
    }

    async exist(key: string): Promise<boolean> {
        return !!(await this.prisma.cache.findFirst({
            where: {
                key,
            },
            select: {
                key: true,
            },
        }));
    }

    async findKeys(pattern = ""): Promise<{ key: string }[]> {
        return await this.prisma.cache.findMany({
            where: {
                key: {
                    contains: pattern,
                },
            },
            select: {
                key: true,
            },
        });
    }

    async count(pattern = ""): Promise<number> {
        return await this.prisma.cache.count({
            where: {
                key: {
                    contains: pattern,
                },
            },
        });
    }

    async findValue(key: string) {
        return await this.prisma.cache.findUnique({
            where: {
                key,
            },
        });
    }

    async upsert(cache: Cache) {
        return await this.prisma.cache.upsert({
            where: {
                key: cache.key,
            },
            create: cache,
            update: cache,
        });
    }

    async renew(key: string, ttl: number, expiredAt: Date) {
        await this.prisma.cache.update({
            where: {
                key,
            },
            data: {
                ttl,
                expiredAt,
            },
        });
    }
}
