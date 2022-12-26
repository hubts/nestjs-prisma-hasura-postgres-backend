import { IBase } from "@shared/model";

export interface IUser extends IBase {
    email: string;
    password: string;
    name: string;
    age: number;
}
