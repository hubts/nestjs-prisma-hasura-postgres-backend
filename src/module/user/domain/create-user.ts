import { Prisma } from "@prisma/client";
import { CryptoExtension } from "src/shared/util/crypto-extension";
import { Random } from "src/shared/util/random";

export const createUser = (props: {
    email: string;
    password: string;
    nickname: string;
    mobile: string;
}) => {
    const { email, password, nickname, mobile } = props;
    const newUser: Prisma.UserCreateInput = {
        id: Random.uuid(),
        email,
        password: CryptoExtension.hashPassword(password),
        nickname,
        Profile: {
            create: {
                id: Random.uuid(),
                mobile,
            },
        },
    };
    return newUser;
};
