import { Column, Entity, OneToOne } from "typeorm";
import { AuditEntity } from "../common/audit.entity";
import { IUserProfile } from "src/shared/entity";
import { UserEntity } from "./user.entity";

@Entity("user_profile")
export class UserProfileEntity extends AuditEntity implements IUserProfile {
    @Column({ unique: true, comment: "User unique mobile number" })
    mobile: string;

    /**
     * Relation
     */

    @OneToOne(() => UserEntity, user => user.profile)
    user: UserEntity;
}
