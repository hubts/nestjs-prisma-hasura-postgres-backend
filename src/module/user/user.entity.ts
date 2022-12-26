import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity("user", { schema: process.env.DB_SCHEMA })
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("text")
    name: string;

    @Column("int")
    age: number;

    @CreateDateColumn({
        name: "created_at",
    })
    createdAt: Date;

    @UpdateDateColumn({
        name: "updated_at",
    })
    updatedAt: Date;

    @DeleteDateColumn({
        name: "deleted_at",
    })
    deletedAt: Date;
}
