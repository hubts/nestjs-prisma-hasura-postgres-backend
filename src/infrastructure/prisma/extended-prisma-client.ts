import { PrismaClient } from "@prisma/client";
import {
    softDelete,
    softDeleteMany,
    filterSoftDeleted,
} from "./util/soft-delete.extension";

/**
 * Extended Prisma Client Class
 *
 * This will be extended to our PrismaService.
 * This includes the instance of extended prisma client.
 */
export class PrismaClientExtended extends PrismaClient {
    extendedPrismaClient: ExtendedPrismaClient;

    get client() {
        if (!this.extendedPrismaClient)
            this.extendedPrismaClient = extendPrismaClient(this);
        return this.extendedPrismaClient;
    }
}

// Function changing the prisma client to extended prisma client.
export const extendPrismaClient = (prismaClient: PrismaClient) => {
    return prismaClient
        .$extends(softDelete)
        .$extends(softDeleteMany)
        .$extends(filterSoftDeleted);
};

// Type of extended prisma client.
export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClient>;
