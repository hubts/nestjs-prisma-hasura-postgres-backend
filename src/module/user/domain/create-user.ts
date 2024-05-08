import { createAudit } from "src/shared/entity/audit";
import { IUser } from "src/shared/entity/user";
import { IUserProfile } from "src/shared/entity/user-profile";
import { UserRole } from "src/shared/enum/user-role.enum";
import { CryptoExtension } from "src/shared/util/crypto-extension";

export const createUser = (
    props: Pick<IUser, "email" | "password" | "nickname"> &
        Pick<IUserProfile, "mobile">
): IUser => {
    const { email, password, nickname, mobile } = props;
    const newUser: IUser = {
        ...createAudit(),
        role: UserRole.USER,
        email,
        password: CryptoExtension.hashPassword(password),
        nickname,
        profile: {
            ...createAudit(),
            mobile,
        },
    };
    return newUser;
};
