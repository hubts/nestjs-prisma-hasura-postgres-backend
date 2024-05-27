import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class CustomLoggerRepository {
    constructor(private prisma: PrismaService) {}

    async console(data: Prisma.ConsoleLogCreateArgs["data"]): Promise<void> {
        await this.prisma.consoleLog.create({
            data,
        });
    }

    async error(data: Prisma.ErrorLogCreateArgs["data"]): Promise<void> {
        await this.prisma.errorLog.create({
            data,
        });
    }
}
