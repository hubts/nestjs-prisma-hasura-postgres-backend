import { PrismaService } from "./prisma.service";

export type PrismaTxType = Parameters<
    Parameters<PrismaService["$transaction"]>[0]
>[0];
