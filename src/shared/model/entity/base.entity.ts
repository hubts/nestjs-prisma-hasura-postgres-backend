import { Exclude } from "class-transformer";
import { CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IBase } from "../interface/base.interface";

@Entity()
export abstract class BaseEntity implements IBase {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @CreateDateColumn({
        type: "timestamptz",
        name: "created_at",
    })
    createdAt!: Date;

    @UpdateDateColumn({
        type: "timestamptz",
        name: "updated_at",
    })
    updatedAt!: Date;

    @Exclude()
    @DeleteDateColumn({
        type: "timestamptz",
        name: "deleted_at",
    })
    deletedAt?: Date | null;
}
