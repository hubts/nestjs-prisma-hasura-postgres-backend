import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async findUser(where: Prisma.UserWhereUniqueInput) {
        return await this.prisma.user.findUnique({ where });
    }

    async findUserByMobile(mobile: string) {
        return await this.prisma.user.findFirst({
            where: { Profile: { mobile } },
        });
    }

    async findManyUsers(where: Prisma.UserWhereInput) {
        return await this.prisma.user.findMany({ where });
    }

    async findProfile(userId: string) {
        return await this.prisma.profile.findUnique({ where: { userId } });
    }

    async findUserWithProfileById(id: string) {
        return await this.prisma.user.findFirst({
            where: { id },
            include: { Profile: true },
        });
    }

    async findManyUsersByEmailOrNicknameOrMobile(props: {
        email: string;
        nickname: string;
        mobile: string;
    }) {
        const { email, nickname, mobile } = props;
        return await this.prisma.user.findMany({
            select: {
                email: true,
                nickname: true,
                Profile: {
                    select: {
                        mobile: true,
                    },
                },
            },
            where: {
                OR: [{ email }, { nickname }, { Profile: { mobile } }],
            },
        });
    }

    async createUser(data: Prisma.UserCreateInput) {
        return await PrismaService.getTransaction().user.create({ data });
    }

    async updateUser(id: string, data: Prisma.UserUpdateInput) {
        return await PrismaService.getTransaction().user.update({
            where: { id },
            data,
        });
    }

    async updateProfileByUserId(
        userId: string,
        data: Prisma.ProfileUpdateInput
    ) {
        return await PrismaService.getTransaction().profile.update({
            where: { userId },
            data,
        });
    }
}
