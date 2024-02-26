import { IControllerRoute } from "src/common/interface";
import { UserRole } from "src/shared/enum";

export const UserRouteName = "users";
export const UserRoute: IControllerRoute = {
    updatePassword: {
        name: "update-password",
        permissions: [UserRole.USER],
    },
};
