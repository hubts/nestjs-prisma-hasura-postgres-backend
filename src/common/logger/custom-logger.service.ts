import { Injectable, LogLevel } from "@nestjs/common";
import { ServerEnv } from "src/config/config.interface";
import { CustomLoggerRepository } from "./custom-logger.repository";
import { IConsoleLog, IErrorLog } from "./interface/log.interface";

@Injectable()
export class CustomLoggerService {
    constructor(private log: CustomLoggerRepository) {}

    getLogLevels(environment: ServerEnv): LogLevel[] {
        if (environment === ServerEnv.PRODUCTION) {
            return ["log", "verbose", "warn", "error"];
        } else if (environment === ServerEnv.TEST) {
            return [];
        }
        return ["error", "warn", "log", "verbose", "debug"];
    }

    async createConsoleLog(log: IConsoleLog): Promise<void> {
        try {
            await this.log.console({
                id: log.id,
                message: log.message,
                context: log.context,
                level: log.level,
                trace: log.trace,
            });
        } catch (error) {
            console.error(`ConsoleLogError: ${error}`);
        }
    }

    async createErrorLog(log: IErrorLog): Promise<void> {
        try {
            await this.log.error({
                id: log.id,
                message: log.message,
                context: log.context,
                trace: log.trace,
            });
        } catch (error) {
            console.error(`ErrorLogError: ${error}`);
        }
    }
}
