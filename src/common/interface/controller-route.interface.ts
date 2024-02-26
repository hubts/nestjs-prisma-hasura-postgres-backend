import { UserRole } from "src/shared/enum";

export type IControllerRoute = {
    [key in string]: {
        name: string;
        permissions: UserRole[];
    };
};
