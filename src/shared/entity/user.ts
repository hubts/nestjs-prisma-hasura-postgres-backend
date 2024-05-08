import { UserRole } from "../enum/user-role.enum";
import { IAudit } from "./audit";
import { IUserProfile } from "./user-profile";

export interface IUser extends IAudit, IUserRelation {
    email: string;
    password: string;
    nickname: string;
    role: UserRole;
}

interface IUserRelation {
    profile?: IUserProfile;
}
