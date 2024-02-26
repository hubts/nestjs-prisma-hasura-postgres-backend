import { IControllerRoute } from "src/common/interface";

export const AuthRouteName = "auth";
export const AuthRoute: IControllerRoute = {
    JoinUser: {
        name: "join-user",
        permissions: [],
    },
    LoginUser: {
        name: "login-user",
        permissions: [],
    },
};
