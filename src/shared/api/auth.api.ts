import { IApiRoute } from "./interface/api-route.type";
import { IResponse } from "../response/interface/response.interface";

export const AuthRoute: IApiRoute<IAuthApi> = {
    prefix: "auth",
    subPath: {
        joinUser: {
            name: "user/join",
            roles: [],
            summary: "Join as a new user",
            description: [
                "Anyone can join as a new user.",
                "You must insert unique email, nickname, and mobile to join.",
                "The password you insert will be protected by 1-way encryption.",
                "See example schema of request body.",
                "If you are successfully joined, you can get new access and refresh tokens.",
            ],
        },
        loginUser: {
            name: "user/login",
            roles: [],
            summary: "After joining, login as the user.",
            description: [
                "Anyone can login as the previously joined user.",
                "You must insert email and password to login.",
                "If you login successfully, you can get new access and refresh tokens.",
            ],
        },
        refreshUser: {
            name: "user/refresh",
            roles: [],
            summary: "Refresh your access and refresh tokens to continue.",
            description: [
                "Anyone who has own refresh token and identity information can refresh to get new tokens.",
                "You must insert the refresh token recently issued and own identity information (such as ID).",
                "You will get new access and refresh tokens.",
            ],
        },
    },
};

export interface IAuthApi {
    joinUser: (input: IUserJoinDto) => Promise<IResponse<IAuthTokenResult>>;
    loginUser: (input: IUserLoginDto) => Promise<IResponse<IAuthTokenResult>>;
    refreshUser: (
        input: IUserRefreshDto
    ) => Promise<IResponse<IAuthTokenResult>>;
}

export interface IUserLoginDto {
    email: string;
    password: string;
}

export interface IUserJoinDto extends IUserLoginDto {
    nickname: string;
    mobile: string;
}

export interface IUserRefreshDto {
    refreshToken: string;
    id: string;
}

export interface IAuthTokenResult {
    accessToken: string;
    refreshToken: string;
}
