import { Module } from "@nestjs/common";
import { CustomLogger } from "./custom.logger";
import { CustomLoggerService } from "./custom-logger.service";

@Module({
    providers: [CustomLogger, CustomLoggerService],
    exports: [CustomLogger, CustomLoggerService],
})
export class CustomLoggerModule {}
