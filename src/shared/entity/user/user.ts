import { UserRole } from "../../enum";
import { IAudit } from "../common/audit";
import { IUserProfile } from "./user-profile";

export interface IUser extends IAudit, IUserRelation {
    email: string;
    password: string;
    nickname: string;
    role: UserRole;
}

export interface IUserRelation {
    profile: IUserProfile;
}
