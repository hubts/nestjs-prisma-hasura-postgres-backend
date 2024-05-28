import { LogLevel } from "@nestjs/common";

export interface IConsoleLog {
    id: string;
    message: string;
    context: string;
    level: LogLevel;
    trace: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IErrorLog extends Omit<IConsoleLog, "level"> {}
