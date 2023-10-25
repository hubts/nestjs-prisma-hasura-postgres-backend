import { UserRole } from "../../enum";
import { IAudit } from "../audit.interface";

export interface IUser extends IAudit {
    email: string;
    password: string;
    nickname: string;
    role: UserRole;
}
