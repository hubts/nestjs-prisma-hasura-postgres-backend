// Definition of response custom code and name
export const RESPONSE_CODE = {
    /**
     * Success code (commonly used)
     */

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
    4007: "USER_NOT_FOUND",
    4008: "INVALID_REFRESH_TOKEN",
    4009: "UNAUTORIZED_ACCESS",

    /**
     * Error codes (Expected, but errors)
     */

    5000: "UNEXPECTED_ERROR",
} as const;
