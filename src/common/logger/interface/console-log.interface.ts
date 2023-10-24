import { LogLevel } from "@nestjs/common";

export interface IConsoleLog {
    message: string;
    context: string;
    level: LogLevel;
    trace: string | null;
}
