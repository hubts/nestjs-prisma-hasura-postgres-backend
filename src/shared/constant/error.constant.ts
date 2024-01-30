import { IResponse } from "../interface";

export const ERROR: {
    [key: string]: IResponse;
} = {
    EMAIL_ALREADY_EXISTS: {
        success: false,
        code: 4001,
        message: "This email already exists.",
    },
    NICKNAME_ALREADY_EXISTS: {
        success: false,
        code: 4002,
        message: "This nickname already exists.",
    },
    WRONG_PASSWORD: {
        success: false,
        code: 4003,
        message: "The password is wrong.",
    },
};
