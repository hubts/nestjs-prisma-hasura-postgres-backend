import { Column, Entity, OneToOne } from "typeorm";
import { AuditEntity } from "../common/audit.entity";
import { UserEntity } from "./user.entity";
import { IUserProfile } from "src/shared/entity/user-profile";

@Entity("user_profile")
export class UserProfileEntity extends AuditEntity implements IUserProfile {
    @Column({ unique: true, comment: "User unique mobile number" })
    mobile: string;

    /**
     * Relation
     */

    @OneToOne(() => UserEntity, user => user.profile)
    user?: UserEntity;
}
