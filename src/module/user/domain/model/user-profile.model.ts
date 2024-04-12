import { AuditModel } from "src/common/model/audit.model";
import { IUserProfile } from "src/shared/entity";
import { UserModel } from "./user.model";

export class UserProfileModel extends AuditModel implements IUserProfile {
    mobile: string;
    user: UserModel;

    constructor(props: Pick<UserProfileModel, "mobile">) {
        super();
        const { mobile } = props;
        this.mobile = mobile;
    }
}
