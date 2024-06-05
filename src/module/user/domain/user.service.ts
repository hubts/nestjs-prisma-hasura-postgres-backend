import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { User } from "@prisma/client";
import { checkUserPropsExist } from "./check-user-props-exist";
import { checkUserPassword, hashUserPassword } from "./user-password-manager";

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
    }): Promise<ReturnType<typeof checkUserPropsExist>> {
        const users =
            await this.userRepo.findManyUsersByEmailOrNicknameOrMobile(where);
        const flatten = users.map(user => ({
            email: user.email,
            nickname: user.nickname,
            mobile: user.Profile?.mobile,
        }));
        return checkUserPropsExist(flatten, where);
    }

    async getUserWithProfileById(id: string) {
        return await this.userRepo.findUserWithProfileById(id);
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepo.findUser({ id });
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findUser({ email });
    }

    async getUserByMobile(mobile: string): Promise<User | null> {
        return await this.userRepo.findUserByMobile(mobile);
    }

    async join(props: {
        email: string;
        password: string;
        nickname: string;
        mobile: string;
    }): Promise<User> {
        const { email, password, nickname, mobile } = props;
        return await this.userRepo.createUser({
            email,
            password: hashUserPassword(password),
            nickname,
            Profile: {
                create: {
                    mobile,
                },
            },
        });
    }

    async login(email: string, password: string): Promise<User | null> {
        const user = await this.getUserByEmail(email);
        return user && checkUserPassword(user.password, password) ? user : null;
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        await this.userRepo.updateUser(id, {
            password: hashUserPassword(newPassword),
        });
    }

    async updateMobile(userId: string, newMobile: string): Promise<void> {
        await this.userRepo.updateProfileByUserId(userId, {
            mobile: newMobile,
        });
    }
}
