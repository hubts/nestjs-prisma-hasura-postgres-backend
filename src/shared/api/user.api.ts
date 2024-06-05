import { IApiRoute } from "../interface/api-route.type";
import { IResponse } from "../response/interface/response.interface";

export const UserRoute: IApiRoute<IUserApi> = {
    prefix: "users",
    subPath: {
        getUserInfoById: {
            name: "id/:id",
            roles: [],
        },
    },
};

export interface IUserApi {
    getUserInfoById: (
        input: IUserIdParam
    ) => Promise<IResponse<IUserResource<IUserInfoResult>>>;
}

export interface IUserIdParam {
    id: string;
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
