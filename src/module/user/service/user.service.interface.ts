import { IdResult } from "src/shared/dto";

export interface IUserService {
    getUsersAll(): Promise<IFindUsersResult>;
    getUserOneByEmail(email: string): Promise<IFindUserOneResult>;
    createUser(input: ICreateUserInput): Promise<IUserIdResult>;
    updateUser(id: string, input: IUpdateUserInput): Promise<IUserIdResult>;
    deleteUser(id: string): Promise<void>;
}

export interface IUserOneResult {
    id: string;
    nickname: string;
    email: string;
}

export interface IFindUserOneResult {
    user: IUserOneResult;
}

export interface IFindUsersResult {
    users: IUserOneResult[];
}

export interface ICreateUserInput {
    email: string;
    nickname: string;
    password: string;
}

export interface IUserIdResult {
    user: IdResult;
}

export interface IUpdateUserInput {
    email?: string;
    nickname?: string;
}
