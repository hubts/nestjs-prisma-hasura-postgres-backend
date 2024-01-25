import { IResponse } from "../response";

export interface IUpdatePasswordInput {
    originalPassword: string;
    newPassword: string;
}

export interface IUpdatePasswordOutputData {
    id: string;
}

export type IUpdatePasswordOutput = IResponse<IUpdatePasswordOutputData>;
