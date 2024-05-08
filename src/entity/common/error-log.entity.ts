import { IErrorLog } from "src/common/logger/interface/error-log.interface";
import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from "typeorm";

@Entity("error_log")
export class ErrorLogEntity implements IErrorLog {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn({ type: "timestamptz" })
    createdAt: Date;

    @Column()
    message: string;

    @Column()
    context: string;

    @Column({ type: "varchar", nullable: true })
    trace: string | null;
}
