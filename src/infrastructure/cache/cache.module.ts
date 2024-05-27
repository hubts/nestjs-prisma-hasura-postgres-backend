import { Global, Module } from "@nestjs/common";
import { CacheService } from "./cache.service";
import { PrismaModule } from "../prisma/prisma.module";
import { CacheRepository } from "./cache.repository";

@Global()
@Module({
    imports: [PrismaModule],
    providers: [CacheRepository, CacheService],
    exports: [CacheService],
})
export class CacheModule {}
