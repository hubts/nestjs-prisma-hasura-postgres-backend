import { FailureName } from "../interface/response.type";

/**
 * You can define the failure messages corresponding to the failure and error response codes.
 */
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
    INVALID_REFRESH_TOKEN: "The refresh token is not valid.",
    UNAUTORIZED_ACCESS: "Unauthorized access. Please try in a different way.",

    // ERROR
    UNEXPECTED_ERROR: "Unexpected error occurs. Please try again.",
};
