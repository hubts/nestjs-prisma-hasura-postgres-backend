import { BaseEntity } from "@shared/entity/base.entity";
import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";

@Entity("user", { schema: process.env.DB_SCHEMA })
export class User extends BaseEntity {
    @Column("text")
    email: string;

    @Exclude()
    @Column("text")
    password: string;

    @Column("text")
    name: string;

    @Column("int")
    age: number;
}
