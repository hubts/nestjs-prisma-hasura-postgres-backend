import { LogLevel } from "@nestjs/common";
import { IConsoleLog } from "src/common/logger/interface";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ConsoleLogEntity implements IConsoleLog {
    @PrimaryGeneratedColumn()
    id!: number;
    message!: string;
    context!: string;
    level!: LogLevel;
    trace!: string | null;
}
