import { IErrorLog } from "src/common/logger/interface";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ErrorLogEntity implements IErrorLog {
    @PrimaryGeneratedColumn()
    id!: number;
    message!: string;
    context!: string;
    trace!: string | null;
}
