import { IActionRoute } from "../interface/action-route.type";
import { IResponse } from "../response/response.interface";

export const AuthRoute: IActionRoute<IAuthAction> = {
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

export interface IAuthAction {
    joinUser: (input: IJoinUserInput) => Promise<IResponse<ITokenOutput>>;
    loginUser: (input: ILoginUserInput) => Promise<IResponse<ITokenOutput>>;
}

export interface IJoinUserInput {
    email: string;
    password: string;
    nickname: string;
    mobile: string;
}

export interface ITokenOutput {
    accessToken: string;
    refreshToken: string;
}

export interface ILoginUserInput {
    email: string;
    password: string;
}
