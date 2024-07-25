import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class TransactionManager {
    constructor(private readonly prisma: PrismaService) {}

    async transaction<R>(callback: () => Promise<R>): Promise<R> {
        return await this.prisma.client.$transaction(async tx => {
            try {
                this.prisma.beginTransaction(tx);
                return callback();
            } catch (e) {
                if (e instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new InternalServerErrorException(
                        `[${e.code}] The transaction of database has broken`,
                        { cause: e, description: e.message }
                    );
                }
                throw e;
            }
        });
    }
}
