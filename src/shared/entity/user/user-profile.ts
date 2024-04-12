import { IAudit } from "../common/audit";
import { IUser } from "./user";

export interface IUserProfile extends IAudit, IUserProfileRelation {
    mobile: string;
}

export interface IUserProfileRelation {
    user: IUser;
}
