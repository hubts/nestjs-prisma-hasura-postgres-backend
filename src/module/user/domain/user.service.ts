import { CryptoExtension } from "src/shared/util/crypto-extension";
import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { checkPassword } from "./check-password";
import { checkUserExists } from "./check-user-exists";
import { createUser } from "./create-user";
import { User } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(private readonly userRepo: UserRepository) {}

    summarize(user: User): string {
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
                mobile: user.Profile?.mobile,
            };
        });
        return checkUserExists(flatten, where);
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepo.findUnique({ id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findUnique({ email });
    }

    async join(props: {
        email: string;
        password: string;
        nickname: string;
        mobile: string;
    }): Promise<User> {
        const newUser = createUser(props);
        return await this.userRepo.createUser(newUser);
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        return user && checkPassword(user.password, password) ? user : null;
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        await this.userRepo.updateUser({
            where: {
                id,
            },
            data: {
                password: CryptoExtension.hashPassword(newPassword),
            },
        });
    }
}
