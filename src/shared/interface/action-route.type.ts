import { UserRole } from "src/shared/enum/user-role.enum";

export type IActionRoute<T> = {
    prefix: string;
    subPath: {
        [key in keyof T]: {
            name: string;
            roles: UserRole[];
        };
    };
};
