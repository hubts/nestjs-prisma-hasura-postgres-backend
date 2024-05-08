import { Injectable } from "@nestjs/common";
import { UserProfileEntity } from "src/entity/user/user-profile.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserProfileRepository extends Repository<UserProfileEntity> {
    constructor(dataSource: DataSource) {
        super(UserProfileEntity, dataSource.createEntityManager());
    }

    async findOneByMobile(mobile: string): Promise<UserProfileEntity | null> {
        return await this.findOneBy({ mobile });
    }
}
