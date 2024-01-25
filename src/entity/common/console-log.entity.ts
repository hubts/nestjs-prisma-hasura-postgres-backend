import { LogLevel } from "@nestjs/common";
import { IConsoleLog } from "src/common/logger/interface";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("console_log")
export class ConsoleLogEntity implements IConsoleLog {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column()
    message: string;

    @Column()
    context: string;

    @Column()
    level: LogLevel;

    @Column({ type: "varchar", nullable: true })
    trace: string | null;
}
