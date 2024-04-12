import { Injectable } from "@nestjs/common";
import { UserModel } from "./model/user.model";
import { CryptoExtension } from "src/shared/util";
import { UserRepository } from "../repository/user.repository";
import { UserProfileModel } from "./model/user-profile.model";
import { UserProfileRepository } from "../repository/user-profile.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
        private readonly userProfileRepo: UserProfileRepository
    ) {}

    private hashPassword(newPassword: string): string {
        return CryptoExtension.hashPassword(newPassword);
    }

    summarize(user: UserModel): string {
        return `User (id = ${user.id}, email = ${user.email}, nickname = ${user.nickname})`;
    }

    async existsBy(
        where: Pick<UserModel, "email" | "nickname"> &
            Pick<UserProfileModel, "mobile">
    ): Promise<{
        exists: boolean;
        reason: "none" | "email" | "nickname" | "mobile";
    }> {
        const { email, nickname, mobile } = where;
        // Email, Nickname
        const duplicateUsers =
            await this.userRepo.findManyByEmailOrNicknameToCheck({
                email,
                nickname,
            });
        if (!duplicateUsers.length) {
            return {
                exists: false,
                reason: "none",
            };
        }
        // Mobile
        const duplicateUserByMobile =
            await this.userProfileRepo.findOneByMobile(mobile);
        if (!duplicateUserByMobile) {
            return {
                exists: false,
                reason: "none",
            };
        }
        return {
            exists: true,
            reason: duplicateUsers.find(user => user.email === email)
                ? "email"
                : duplicateUsers.find(user => user.nickname === nickname)
                ? "nickname"
                : !!duplicateUserByMobile
                ? "mobile"
                : "none",
        };
    }

    async getUserById(id: string): Promise<UserModel | null> {
        const userEntity = await this.userRepo.findOneBy({ id });
        if (!userEntity) return null;
        return UserModel.fromEntity(userEntity);
    }

    async getUserByEmail(email: string): Promise<UserModel | null> {
        const userEntity = await this.userRepo.findOneByEmail(email);
        if (!userEntity) return null;
        return UserModel.fromEntity(userEntity);
    }

    async createUser(
        props: Pick<UserModel, "email" | "password" | "nickname"> &
            Pick<UserProfileModel, "mobile">
    ): Promise<UserModel> {
        const { email, password, nickname, mobile } = props;
        const newUserProfileModel = new UserProfileModel({
            mobile,
        });
        const newUserModel = new UserModel(
            {
                email,
                password: this.hashPassword(password),
                nickname,
            },
            {
                profile: newUserProfileModel,
            }
        );
        const createdUserEntity = this.userRepo.create(newUserModel);
        const savedUserEntity = await this.userRepo.save(createdUserEntity);
        return UserModel.fromEntity(savedUserEntity);
    }

    async loginUser(
        props: Pick<UserModel, "email" | "password">
    ): Promise<UserModel | null> {
        const { email, password } = props;
        const userEntity = await this.userRepo.findOneByEmail(email);
        if (!userEntity || !this.checkPassword(userEntity, password)) {
            return null;
        }
        return UserModel.fromEntity(userEntity);
    }

    checkPassword(
        user: Pick<UserModel, "password">,
        inputPassword: string
    ): boolean {
        return CryptoExtension.comparePassword(inputPassword, user.password);
    }

    async updatePassword(userId: string, newPassword: string): Promise<void> {
        await this.userRepo.updatePassword(
            userId,
            this.hashPassword(newPassword)
        );
    }
}
