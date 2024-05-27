import { Injectable, LogLevel } from "@nestjs/common";
import { IConsoleLog } from "./interface/console-log.interface";
import { IErrorLog } from "./interface/error-log.interface";
import { ServerEnv } from "src/config/config.interface";
import { CustomLoggerRepository } from "./custom-logger.repository";

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
                message: log.message,
                context: log.context,
                trace: log.trace,
            });
        } catch (error) {
            console.error(`ErrorLogError: ${error}`);
        }
    }
}
