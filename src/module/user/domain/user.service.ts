import { CryptoExtension } from "src/shared/util/crypto-extension";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { IUser } from "src/shared/entity/user";
import { checkPassword } from "./check-password";
import { checkUserExists } from "./check-user-exists";
import { createUser } from "./create-user";

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    summarize(user: IUser): string {
        return `User (id = ${user.id}, email = ${user.email}, nickname = ${user.nickname})`;
    }

    async existsBy(where: {
        email: string;
        nickname: string;
        mobile: string;
    }): Promise<ReturnType<typeof checkUserExists>> {
        const users = await this.userRepo.findManyByEmailOrNicknameOrMobile(
            where
        );
        const flatten = users.map(user => {
            return {
                email: user.email,
                nickname: user.nickname,
                mobile: user.profile.mobile,
            };
        });
        return checkUserExists(flatten, where);
    }

    async getUserById(id: string): Promise<IUser | null> {
        return await this.userRepo.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        return await this.userRepo.findOneBy({ email });
    }

    async join(props: {
        email: string;
        password: string;
        nickname: string;
        mobile: string;
    }): Promise<IUser> {
        const newUser = createUser(props);
        return await this.userRepo.save(newUser);
    }

    async login(email: string, password: string): Promise<IUser | null> {
        const user = await this.getUserByEmail(email);
        return user && checkPassword(user.password, password) ? user : null;
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        await this.userRepo.update(id, {
            password: CryptoExtension.hashPassword(newPassword),
        });
    }
}
