import { Column, Entity } from "typeorm";
import { AuditEntity } from "../audit.entity";
import { IUser } from "src/shared/entity";
import { UserRole } from "src/shared/enum";

@Entity("user")
export class UserEntity extends AuditEntity implements IUser {
    @Column({ unique: true, comment: "User unique email" })
    email!: string;

    @Column({ comment: "User password (hashed)" })
    password!: string;

    @Column({
        length: 20,
        unique: true,
        comment: "User unique nickname (max 20 length)",
    })
    nickname!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
        comment: `User role: ${Object.values(UserRole)}`,
    })
    role!: UserRole;
}
