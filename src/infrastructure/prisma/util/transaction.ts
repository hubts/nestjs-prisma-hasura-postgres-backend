import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { InternalServerErrorException } from "@nestjs/common";

export async function transaction<R>(logic: () => R) {
    try {
        const prisma = new PrismaService();
        return await prisma.client.$transaction(async tx => {
            prisma.beginTransaction(tx);
            return logic();
        });
    } catch (e) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            throw new InternalServerErrorException(
                `[${e.code}] The transaction of database has broken`,
                { cause: e, description: e.message }
            );
        }
        throw e;
    }
}
