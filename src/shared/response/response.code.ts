// Definition of response custom code and name
export const RESPONSE_CODE = {
    // SUCCESS (Common)
    1000: "SUCCESS",

    /**
     * Failure codes
     */

    // USER
    4001: "DUPLICATE_EMAIL",
    4002: "DUPLICATE_NICKNAME",
    4003: "DUPLICATE_MOBILE",
    4004: "WRONG_PASSWORD",
    4005: "SAME_PASSWORD",
    4006: "UNREGISTERED_EMAIL",

    /**
     * Error codes (Expected, but errors)
     */

    5000: "UNEXPECTED_ERROR",
} as const;

/**
 * Below: types of response code and name
 */

// Type of response code and name
export type ResponseCode = keyof typeof RESPONSE_CODE;
export type ResponseName = typeof RESPONSE_CODE[ResponseCode];

// Type of success code and name
export const SuccessCode = 1000;
export const SuccessName = RESPONSE_CODE[SuccessCode];

// Type of failure code and name
type ExcludeCodeLiteral<T, U extends number> = T extends U ? never : T;
type ExcludeNameLiteral<T, U extends string> = T extends U ? never : T;
export type FailureCode = ExcludeCodeLiteral<ResponseCode, typeof SuccessCode>;
export type FailureName = ExcludeNameLiteral<ResponseName, typeof SuccessName>;
