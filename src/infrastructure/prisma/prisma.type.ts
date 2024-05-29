import { Prisma } from "@prisma/client";
// import * as runtime from "@prisma/client/runtime/library";

export type PrismaTxClient = Prisma.TransactionClient;
// Omit<PrismaClient, runtime.ITXClientDenyList>;
