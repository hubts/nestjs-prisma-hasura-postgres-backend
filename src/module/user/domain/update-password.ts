import { IUser } from "src/shared/entity/user";
import { CryptoExtension } from "src/shared/util/crypto-extension";

export const updatePassword = (user: IUser, newPassword: string): IUser => {
    return {
        ...user,
        password: CryptoExtension.hashPassword(newPassword),
    };
};
