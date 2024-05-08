/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUser } from "src/shared/entity/user";
import { IUserProfile } from "src/shared/entity/user-profile";
import { Random } from "src/shared/util/random";

export const createUser = (
    props: Pick<IUser, "email" | "password" | "nickname"> &
        Pick<IUserProfile, "mobile">
) => {
    const { email, password, nickname, mobile } = props;
    const newUser: IUser = {
        id: Random.uuid(),
        createdAt: undefined!,
        updatedAt: undefined!,
        deletedAt: null,
        role: undefined!,
        email,
        password,
        nickname,
        profile: {
            id: Random.uuid(),
            createdAt: undefined!,
            updatedAt: undefined!,
            deletedAt: null,
            mobile,
        },
    };
    return newUser;
};
