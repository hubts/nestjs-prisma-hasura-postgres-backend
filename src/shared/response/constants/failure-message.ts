import { FailureName } from "../interface/response.type";

export const FAILURE_MESSAGE: {
    [key in FailureName]: string;
} = {
    // USER
    DUPLICATE_EMAIL: "This email already exists.",
    DUPLICATE_NICKNAME: "This nickname already exists.",
    DUPLICATE_MOBILE: "This mobile already exists.",
    WRONG_PASSWORD: "This is wrong password.",
    SAME_PASSWORD: "This password is same as before.",
    UNREGISTERED_EMAIL: "This email is not registered.",
    USER_NOT_FOUND: "The user does not exist.",

    // ERROR
    UNEXPECTED_ERROR: "Unexpected error occurs. Please try again.",
};
