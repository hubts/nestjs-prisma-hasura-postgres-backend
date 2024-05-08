export const FAILURE_CODE = {
    // USER
    4001: "DUPLICATE_EMAIL",
    4002: "DUPLICATE_NICKNAME",
    4003: "DUPLICATE_MOBILE",
    4004: "WRONG_PASSWORD",
    4005: "SAME_PASSWORD",
    4006: "UNREGISTERED_EMAIL",

    // ERROR
    5000: "UNEXPECTED_ERROR",
} as const;

export type FailureCode = keyof typeof FAILURE_CODE;
export type FailureCodeName = typeof FAILURE_CODE[FailureCode];
