import {
    ConsoleLogger,
    ConsoleLoggerOptions,
    Inject,
    Injectable,
} from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { CustomLoggerService } from "./custom-logger.service";
import { ServerConfig } from "src/config/validated/server.config";
import { Random } from "src/shared/util/random";

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
        const id = Random.uuid();
        super.verbose.apply(this, [message, context]);
        this.loggerService.createConsoleLog({
            id,
            message,
            level: "verbose",
            context: context ?? this.context ?? "unknown",
            trace: stack ?? null,
        });
    }

    warn(message: string, context?: string, stack?: string) {
        const id = Random.uuid();
        super.warn.apply(this, [message, context]);
        this.loggerService.createConsoleLog({
            id,
            message,
            level: "warn",
            context: context ?? this.context ?? "unknown",
            trace: stack ?? null,
        });
    }

    error(message: string, context?: string, stack?: string, silent?: boolean) {
        const id = Random.uuid();
        if (!silent) {
            super.error.apply(this, [`${message} (Error ID = ${id})`, stack]);
            this.loggerService.createConsoleLog({
                id,
                message,
                level: "error",
                context: context ?? this.context ?? "unknown",
                trace: stack ?? null,
            });
        }
        this.loggerService.createErrorLog({
            id,
            message,
            context: context ?? this.context ?? "unknown",
            trace: stack ?? null,
        });
    }
}
