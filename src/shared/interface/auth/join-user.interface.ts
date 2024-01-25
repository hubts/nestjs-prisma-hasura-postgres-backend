import { IResponse } from "../response";

export interface IJoinUserInput {
    email: string;
    password: string;
    nickname: string;
}

export interface IJoinUserOutputData {
    accessToken: string;
    refreshToken: string;
}

export type IJoinUserOutput = IResponse<IJoinUserOutputData>;
