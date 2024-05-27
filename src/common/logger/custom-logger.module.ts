import { Module } from "@nestjs/common";
import { CustomLogger } from "./custom.logger";
import { CustomLoggerService } from "./custom-logger.service";
import { CustomLoggerRepository } from "./custom-logger.repository";
import { PrismaModule } from "src/infrastructure/prisma/prisma.module";

@Module({
    imports: [PrismaModule],
    providers: [CustomLogger, CustomLoggerService, CustomLoggerRepository],
    exports: [CustomLogger, CustomLoggerService],
})
export class CustomLoggerModule {}
