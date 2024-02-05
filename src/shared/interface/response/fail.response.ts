import { IResponse } from "./response.interface";

type FAIL_KEY =
    | "DUPLICATE_EMAIL"
    | "DUPLICATE_NICKNAME"
    | "WRONG_PASSWORD"
    | "UNREGISTERED_EMAIL"
    | "SAME_PASSWORD";

export const FAIL: {
    readonly [key in FAIL_KEY]: Pick<IResponse, "name" | "code" | "message">;
} = {
    DUPLICATE_EMAIL: {
        code: 4001,
        name: "duplicate email",
        message: "This email already exists.",
    },
    DUPLICATE_NICKNAME: {
        code: 4002,
        name: "duplicate nickname",
        message: "This nickname already exists.",
    },
    WRONG_PASSWORD: {
        code: 4003,
        name: "wrong password",
        message: "The password is wrong.",
    },
    UNREGISTERED_EMAIL: {
        code: 4004,
        name: "unregistered email",
        message: "This email is not registered.",
    },
    SAME_PASSWORD: {
        code: 4005,
        name: "same password",
        message: "A new password is the same as before.",
    },
} as const;
