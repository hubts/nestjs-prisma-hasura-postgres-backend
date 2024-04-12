import { Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { AuditEntity } from "../common/audit.entity";
import { IUser } from "src/shared/entity";
import { UserRole } from "src/shared/enum";
import { USER_PROPERTY_LENGTH } from "src/shared/constant";
import { UserProfileEntity } from "./user-profile.entity";

@Entity("user")
export class UserEntity extends AuditEntity implements IUser {
    @Column({ unique: true, comment: "User unique email" })
    email: string;

    @Column({ comment: "User password (hashed)" })
    password: string;

    @Column({
        length: USER_PROPERTY_LENGTH.NICKNAME.MAX,
        unique: true,
        comment: `User unique nickname (max ${USER_PROPERTY_LENGTH.NICKNAME.MAX} length)`,
    })
    nickname: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.USER,
        comment: `User roles: ${Object.values(UserRole)}`,
    })
    role: UserRole;

    /**
     * Relation
     */

    @OneToOne(() => UserProfileEntity, profile => profile.user, {
        cascade: true,
    })
    @JoinColumn()
    profile: UserProfileEntity;
}
