import { CryptoExtension } from "src/shared/util/crypto-extension";

export const hashUserPassword = (password: string) => {
    return CryptoExtension.hashPassword(password);
};

export const checkUserPassword = (
    hashPassword: string,
    plainPassword: string
) => {
    return CryptoExtension.comparePassword(plainPassword, hashPassword);
};
