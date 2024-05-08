import { FailureCodeName } from "./failure-code";

export const FAILURE_MESSAGE: {
    [key in FailureCodeName]: string;
} = {
    DUPLICATE_EMAIL: "This email already exists.",
    WRONG_PASSWORD: "This is wrong password.",
};
