import { Injectable, LogLevel } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { IConsoleLog, IErrorLog } from "./interface";
import { ServerEnv } from "src/config";
import { ConsoleLogEntity, ErrorLogEntity } from "src/entity";

@Injectable()
export class CustomLoggerService {
    private consoleLogRepo: Repository<ConsoleLogEntity>;
    private errorLogRepo: Repository<ErrorLogEntity>;

    constructor(readonly dataSource: DataSource) {
        this.consoleLogRepo = dataSource.getRepository(ConsoleLogEntity);
        this.errorLogRepo = dataSource.getRepository(ErrorLogEntity);
    }

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
            const newLog = this.consoleLogRepo.create(log);
            await this.consoleLogRepo.save(newLog, {
                data: {
                    isCreatingLogs: true,
                },
            });
        } catch (error) {
            console.error(`ConsoleLogError: ${error}`);
        }
    }

    async createErrorLog(log: IErrorLog): Promise<void> {
        try {
            const newLog = this.errorLogRepo.create(log);
            await this.errorLogRepo.save(newLog, {
                data: {
                    isCreatingLogs: true,
                },
            });
        } catch (error) {
            console.error(`ErrorLogError: ${error}`);
        }
    }
}
