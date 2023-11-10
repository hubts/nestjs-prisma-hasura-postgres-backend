/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import {
    ICreateUserInput,
    IFindUserOneResult,
    IFindUsersResult,
    IUpdateUserInput,
    IUserIdResult,
    IUserService,
} from "./user.service.interface";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "src/entity";
import { IUser } from "src/shared/entity";
import { UserRole } from "src/shared/enum";

@Injectable()
export class UserService implements IUserService {
    private readonly userRepo: Repository<UserEntity>;

    constructor(private readonly dataSource: DataSource) {
        this.userRepo = this.dataSource.getRepository(UserEntity);
    }

    async getUsersAll(): Promise<IFindUsersResult> {
        const users = await this.userRepo.find({
            select: {
                id: true,
                nickname: true,
                email: true,
            },
        });
        return {
            users: users.map(user => ({
                id: user.id,
                nickname: user.nickname,
                email: user.email,
            })),
        };
    }

    async getUserOneByEmail(email: string): Promise<IFindUserOneResult> {
        const user = await this.userRepo.findOne({
            select: {
                id: true,
                nickname: true,
                email: true,
            },
            where: { email },
        });
        if (!user) {
            throw new NotFoundException("User not found with email");
        }
        return {
            user: {
                id: user.id,
                nickname: user.nickname,
                email: user.email,
            },
        };
    }

    async createUser(input: ICreateUserInput): Promise<IUserIdResult> {
        const { email, nickname, password } = input;

        const existingUser = await this.userRepo.findOne({
            where: [{ email }, { nickname }],
        });
        if (existingUser) {
            throw new BadRequestException(
                "User duplicated by email or nickname"
            );
        }

        const newUser: IUser = {
            id: undefined!,
            createdAt: undefined!,
            updatedAt: undefined!,
            deletedAt: null,
            email,
            nickname,
            password,
            role: UserRole.USER,
        };
        const savingUser = await this.userRepo.save(
            this.userRepo.create(newUser)
        );
        return {
            user: {
                id: savingUser.id,
            },
        };
    }

    async updateUser(
        id: string,
        input: IUpdateUserInput
    ): Promise<IUserIdResult> {
        const { email, nickname } = input;

        if (!email && !nickname) {
            throw new BadRequestException("Nothing to change for user");
        }

        const user = await this.userRepo.findOneBy({ id });
        if (!user) {
            throw new NotFoundException("User not found with ID");
        }

        await this.userRepo.update(user.id, {
            email: email ?? user.email,
            nickname: nickname ?? user.nickname,
        });

        return {
            user: {
                id: user.id,
            },
        };
    }

    async deleteUser(id: string): Promise<void> {
        const user = await this.userRepo.exist({ where: { id } });
        if (!user) {
            throw new NotFoundException("User not found with ID");
        }

        await this.userRepo.delete(id);
    }
}
