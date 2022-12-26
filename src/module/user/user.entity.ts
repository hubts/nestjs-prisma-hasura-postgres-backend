import { BaseEntity } from "@shared/model";
import { Exclude } from "class-transformer";
import { Column, Entity } from "typeorm";
import { IUser } from "./user.interface";

@Entity("user", { schema: process.env.DB_SCHEMA })
export class User extends BaseEntity implements IUser {
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
