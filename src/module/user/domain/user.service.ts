import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UserProfileRepository } from "../repository/user-profile.repository";
import { CryptoExtension } from "src/shared/util/crypto-extension";
import { UserEntity } from "src/entity/user/user.entity";
import { IUser } from "src/shared/entity/user";
import { UserProfileEntity } from "src/entity/user/user-profile.entity";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly userProfileRepo: UserProfileRepository
    ) {}

    private hashPassword(newPassword: string): string {
        return CryptoExtension.hashPassword(newPassword);
    }

    checkPassword(userPassword: string, inputPassword: string): boolean {
        return CryptoExtension.comparePassword(inputPassword, userPassword);
    }

    summarize(user: IUser): string {
        return `User (id = ${user.id}, email = ${user.email}, nickname = ${user.nickname})`;
    }

    async duplicationExistsBy(props: {
        email: string;
        nickname: string;
        mobile: string;
    }): Promise<UserEntity[]> {
        return await this.userRepo.findManyByEmailOrNicknameOrMobile(props);
    }

    async getUserById(id: string): Promise<UserEntity | null> {
        return await this.userRepo.findOneBy({ id });
    }

    async getUserByEmail(email: string): Promise<UserEntity | null> {
        return await this.userRepo.findOneBy({ email });
    }

    async login(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.getUserByEmail(email);
        if (!user) return null;
        else if (!this.checkPassword(password, user.password)) return null;
        return user;
    }

    async updatePassword(userId: string, newPassword: string): Promise<void> {
        await this.userRepo.updatePassword(
            userId,
            this.hashPassword(newPassword)
        );
    }
}
