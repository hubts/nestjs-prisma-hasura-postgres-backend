import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "src/entity";

@Injectable()
export class UserRepository extends Repository<UserEntity> {
    constructor(dataSource: DataSource) {
        super(UserEntity, dataSource.createEntityManager());
    }

    async findManyByEmailOrNicknameToCheck(
        props: Pick<UserEntity, "email" | "nickname">
    ): Promise<Pick<UserEntity, "email" | "nickname">[]> {
        const { email, nickname } = props;
        return await this.find({
            select: { email: true, nickname: true },
            where: [{ email }, { nickname }],
        });
    }

    async findOneByEmail(email: string): Promise<UserEntity | null> {
        return await this.findOneBy({ email });
    }

    async updatePassword(id: string, newPassword: string) {
        await this.update(id, { password: newPassword });
    }
}
