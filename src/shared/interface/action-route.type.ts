import { Role } from "@prisma/client";

export type IActionRoute<T> = {
    prefix: string;
    subPath: {
        [key in keyof T]: {
            name: string;
            roles: Role[];
        };
    };
};
