import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { Prisma, PrismaClient } from "@prisma/client";
import { PrismaTxClient } from "./prisma.type";

@Injectable()
export class PrismaService
    extends PrismaClient<Prisma.PrismaClientOptions, "query">
    implements OnModuleInit, OnModuleDestroy
{
    private static instance: PrismaService;
    private static tx: PrismaTxClient;

    constructor() {
        super({
            log: [
                // { emit: "stdout", level: "query" },
                // { emit: "stdout", level: "info" },
                // { emit: "stdout", level: "warn" },
                // { emit: "stdout", level: "error" },
            ],
        });
        // this.$on("query", e => {
        //     console.log("Query: " + e.query);
        //     console.log("Params: " + e.params);
        //     console.log("Duration: " + e.duration + "ms");
        // });
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }

    static getInstance() {
        if (!PrismaService.instance) {
            PrismaService.instance = new PrismaService();
        }
        return PrismaService.instance;
    }

    static beginTransaction(tx: PrismaTxClient) {
        this.tx = tx;
    }

    static getTransaction() {
        return this.tx ?? this.getInstance();
    }
}
