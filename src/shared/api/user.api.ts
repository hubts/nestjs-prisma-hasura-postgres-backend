import { Role, User } from "@prisma/client";
import { IApiRoute } from "./interface/api-route.type";
import { IResponse } from "../response/interface/response.interface";

export const UserRoute: IApiRoute<IUserApi> = {
    prefix: "users",
    subPath: {
        getUserInfoById: {
            name: "id/:id",
            roles: [],
            summary: "Get public information of user by ID",
            description: [
                "You can get the public information of user by ID.",
                "If the user ID does not exist, you will receive the failure message.",
            ],
        },
        getUserInfoByEmail: {
            name: "email/:email",
            roles: [],
            summary: "Get public information of user by email",
            description: [
                "You can get the public information of user by email.",
                "If the user email does not exist, you will receive the failure message.",
            ],
        },
        getMyInfo: {
            name: "me",
            roles: [Role.ADMIN],
            summary: "Get user own information.",
            description: [
                "You can get your own information by login information.",
            ],
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
