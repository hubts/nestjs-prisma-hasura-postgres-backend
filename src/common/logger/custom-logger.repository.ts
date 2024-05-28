import { Injectable } from "@nestjs/common";
import { ConsoleLog, ErrorLog, Prisma } from "@prisma/client";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class CustomLoggerRepository {
    constructor(private prisma: PrismaService) {}

    async console(
        data: Prisma.ConsoleLogCreateArgs["data"]
    ): Promise<ConsoleLog> {
        return await this.prisma.consoleLog.create({
            data,
        });
    }

    async error(data: Prisma.ErrorLogCreateArgs["data"]): Promise<ErrorLog> {
        return await this.prisma.errorLog.create({
            data,
        });
    }
}
