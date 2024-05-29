export const USER_PROPERTY_LENGTH: {
    [key in "NICKNAME" | "PASSWORD"]: {
        MIN: number;
        MAX: number;
    };
} = {
    NICKNAME: { MIN: 4, MAX: 20 },
    PASSWORD: { MIN: 4, MAX: 20 },
};
