import {
    ConsoleLogger,
    ConsoleLoggerOptions,
    Injectable,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CustomLoggerService } from "./custom-logger.service";
import { ServerEnv } from "src/config";

@Injectable()
export class CustomLogger extends ConsoleLogger {
    private readonly loggerService: CustomLoggerService;

    constructor(
        context: string,
        options: ConsoleLoggerOptions,
        configService: ConfigService,
        loggerService: CustomLoggerService
    ) {
        let environment = configService.get<ServerEnv>("ENV");
        if (!environment) environment = ServerEnv.DEVELOPMENT;

        super(context, {
            ...options,
            logLevels: loggerService.getLogLevels(environment),
        });

        this.loggerService = loggerService;
    }

    log(message: string, context?: string) {
        super.log.apply(this, [message, context]);
    }
    debug(message: string, context?: string) {
        super.debug.apply(this, [message, context]);
    }
    verbose(message: string, context?: string, stack?: string) {
        super.verbose.apply(this, [message, context]);
        this.loggerService.createConsoleLog({
            message,
            level: "verbose",
            context: context ?? this.context ?? "unknown",
            trace: stack ?? null,
        });
    }
    warn(message: string, context?: string, stack?: string) {
        super.warn.apply(this, [message, context]);
        this.loggerService.createConsoleLog({
            message,
            level: "warn",
            context: context ?? "unknown",
            trace: stack ?? null,
        });
    }
    error(message: string, context?: string, stack?: string, silent?: boolean) {
        if (!silent) {
            super.error.apply(this, [message, stack]);
            this.loggerService.createConsoleLog({
                message,
                level: "error",
                context: context ?? "unknown",
                trace: stack ?? null,
            });
        }
        this.loggerService.createErrorLog({
            message,
            context: context ?? "unknown",
            trace: stack ?? null,
        });
    }
}
