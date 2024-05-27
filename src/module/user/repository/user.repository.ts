import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "src/infrastructure/prisma/prisma.service";
import { PrismaTxType } from "src/infrastructure/prisma/prisma.type";

@Injectable()
export class UserRepository {
    constructor(private prisma: PrismaService) {}

    async findUnique(where: Prisma.UserWhereUniqueInput) {
        return await this.prisma.user.findUnique({ where });
    }

    async findManyByEmailOrNicknameOrMobile(props: {
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

    async createUser(input: Prisma.UserCreateInput, tx?: PrismaTxType) {
        return await (tx ?? this.prisma).user.create({ data: input });
    }

    async updateUser(args: Prisma.UserUpdateArgs, tx?: PrismaTxType) {
        return await (tx ?? this.prisma).user.update(args);
    }
}
