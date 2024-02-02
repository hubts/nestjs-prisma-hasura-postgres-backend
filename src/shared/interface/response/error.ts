import { IResponse } from "..";

type ERROR_KEY =
    | "EMAIL_ALREADY_EXISTS"
    | "NICKNAME_ALREADY_EXISTS"
    | "WRONG_PASSWORD"
    | "EMAIL_NOT_FOUND";

export const ERROR: {
    [key in ERROR_KEY]: IResponse;
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
    EMAIL_NOT_FOUND: {
        success: false,
        code: 4004,
        message: "This email is not registered.",
    },
};
