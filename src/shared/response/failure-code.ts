export const FAILURE_CODE = {
    // USER
    4001: "DUPLICATE_EMAIL",
    4002: "WRONG_PASSWORD",
} as const;

export type FailureCode = keyof typeof FAILURE_CODE;
export type FailureCodeName = typeof FAILURE_CODE[FailureCode];
