import { Injectable } from "@nestjs/common";
import { UserProfileEntity } from "src/entity/user/user-profile.entity";
import { UserEntity } from "src/entity/user/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async findManyByEmailOrNicknameOrMobile(props: {
        email: string;
        nickname: string;
        mobile: string;
    }) {
        const { email, nickname, mobile } = props;
        return (await this.find({
            select: {
                email: true,
                nickname: true,
                profile: {
                    mobile: true,
                },
            },
            where: [{ email }, { nickname }, { profile: { mobile } }],
        })) satisfies (UserEntity & { profile: UserProfileEntity })[];
    }

    async updatePassword(id: string, newPassword: string) {
        await this.update(id, { password: newPassword });
    }
}
