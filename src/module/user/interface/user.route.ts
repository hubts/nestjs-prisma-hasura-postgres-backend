import { UserRole } from "src/shared/enum";

export const UserRouteName = "users";
export const UserRoute = {
    UpdatePassword: {
        Name: "update-password",
        Permission: [UserRole.USER],
    },
};
