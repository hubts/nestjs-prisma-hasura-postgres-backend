import { IApiRoute } from "../interface/api-route.type";
import { IResponse } from "../response/interface/response.interface";

export const AuthRoute: IApiRoute<IAuthApi> = {
    prefix: "auth",
    subPath: {
        joinUser: {
            name: "user/join",
            roles: [],
        },
        loginUser: {
            name: "user/login",
            roles: [],
        },
    },
};

export interface IAuthApi {
    joinUser: (input: IUserJoinDto) => Promise<IResponse<IAuthTokenResult>>;
    loginUser: (input: IUserLoginDto) => Promise<IResponse<IAuthTokenResult>>;
}

export interface IUserLoginDto {
    email: string;
    password: string;
}

export interface IUserJoinDto extends IUserLoginDto {
    nickname: string;
    mobile: string;
}

export interface IAuthTokenResult {
    accessToken: string;
    refreshToken: string;
}
