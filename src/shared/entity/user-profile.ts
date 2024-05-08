import { IAudit } from "./audit";
import { IUser } from "./user";

export interface IUserProfile extends IAudit, IUserProfileRelation {
    mobile: string;
}

interface IUserProfileRelation {
    user?: IUser;
}
