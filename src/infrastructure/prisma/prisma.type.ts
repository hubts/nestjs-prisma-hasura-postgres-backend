import { ExtendedPrismaClient } from "./extended-prisma-client";

export type PrismaTxClient = Parameters<
    Parameters<ExtendedPrismaClient["$transaction"]>[0]
>[0];
