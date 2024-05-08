import {
    ConsoleLogger,
    ConsoleLoggerOptions,
    Inject,
    Injectable,
} from "@nestjs/common";
import { CustomLoggerService } from "./custom-logger.service";
import { ConfigType } from "@nestjs/config";
import { ServerConfig } from "src/config/validated/server.config";

@Injectable()
export class CustomLogger extends ConsoleLogger {
    private readonly loggerService: CustomLoggerService;

    constructor(
        context: string,
        options: ConsoleLoggerOptions,
        loggerService: CustomLoggerService,
        @Inject(ServerConfig.KEY)
        serverConfig: ConfigType<typeof ServerConfig>
    ) {
        super(context, {
            ...options,
            logLevels: loggerService.getLogLevels(serverConfig.env),
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
