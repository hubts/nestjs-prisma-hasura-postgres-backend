import { Role } from "@prisma/client";

export type IApiRoute<T> = {
    prefix: string;
    subPath: {
        [key in keyof T]: {
            name: string;
            roles: Role[];
            summary: string;
            description: string[];
        };
    };
};
