import { CryptoExtension } from "src/shared/util/crypto-extension";

export const checkPassword = (
    userPassword: string,
    inputPassword: string
): boolean => {
    return CryptoExtension.comparePassword(inputPassword, userPassword);
};
