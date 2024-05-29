import { Role, User } from "@prisma/client";
import { IActionRoute } from "../interface/action-route.type";
import { IResponse } from "../response/response.interface";

export const UserRoute: IActionRoute<IUserAction> = {
    prefix: "users",
    subPath: {
        updatePassword: {
            name: "update-password",
            roles: [Role.USER],
        },
        updateMobile: {
            name: "update-mobile",
            roles: [Role.USER],
        },
    },
};

export interface IUserAction {
    updatePassword: (
        user: User,
        input: IUpdatePasswordInput
    ) => Promise<IResponse>;
    updateMobile: (user: User, input: IUpdateMobileInput) => Promise<IResponse>;
}

export interface IUpdatePasswordInput {
    originalPassword: string;
    newPassword: string;
}

export interface IUpdateMobileInput {
    mobile: string;
}
