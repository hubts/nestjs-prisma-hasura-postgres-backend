import { IUser } from "src/shared/entity/user";
import { IUserProfile } from "src/shared/entity/user-profile";

export const checkUserExists = (
    users: (Pick<IUser, "email" | "nickname"> & Pick<IUserProfile, "mobile">)[],
    where: Pick<IUser, "email" | "nickname"> & Pick<IUserProfile, "mobile">
): {
    exists: boolean;
    reason?: "email" | "nickname" | "mobile" | undefined;
} => {
    if (!users.length) {
        return {
            exists: false,
        };
    }

    const { email, nickname, mobile } = where;
    return {
        exists: true,
        reason: users.find(user => user.email === email)
            ? "email"
            : users.find(user => user.nickname === nickname)
            ? "nickname"
            : users.find(user => user.mobile === mobile)
            ? "mobile"
            : undefined,
    };
};
