import { AuditModel } from "src/common/model/audit.model";
import { IUser } from "src/shared/entity";
import { UserRole } from "src/shared/enum";
import { UserProfileModel } from "./user-profile.model";

export class UserModel extends AuditModel implements IUser {
    email: string;
    nickname: string;
    password: string;
    role: UserRole;
    profile: UserProfileModel;

    constructor(
        props: Pick<UserModel, "email" | "password" | "nickname">,
        relation: {
            profile: UserProfileModel;
        }
    ) {
        super();
        const { email, password, nickname } = props;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        const { profile } = relation;
        this.profile = profile;
    }
}
