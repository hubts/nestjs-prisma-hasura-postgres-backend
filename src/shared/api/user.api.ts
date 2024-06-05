import { Role, User } from "@prisma/client";
import { IApiRoute } from "../interface/api-route.type";
import { IResponse } from "../response/interface/response.interface";

export const UserRoute: IApiRoute<IUserApi> = {
    prefix: "users",
    subPath: {
        getUserInfoById: {
            name: "id/:id",
            roles: [],
        },
        getUserInfoByEmail: {
            name: "email/:email",
            roles: [],
        },
        getMyInfo: {
            name: "me",
            roles: [Role.USER],
        },
    },
};

export interface IUserApi {
    getUserInfoById: (
        input: IUserIdParam
    ) => Promise<IResponse<IUserResource<IUserInfoResult>>>;
    getUserInfoByEmail: (
        input: IUserEmailParam
    ) => Promise<IResponse<IUserResource<IUserInfoResult>>>;
    getMyInfo: (
        user: User
    ) => Promise<IResponse<IUserResource<IMyUserInfoResult>>>;
}

export interface IUserIdParam {
    id: string;
}

export interface IUserEmailParam {
    email: string;
}

export interface IUserResource<R> {
    user: R;
}

export interface IUserInfoResult {
    id: string;
    joinedAt: Date;
    email: string;
    nickname: string;
}

export interface IMyUserInfoResult extends IUserInfoResult {
    mobile: string;
}
