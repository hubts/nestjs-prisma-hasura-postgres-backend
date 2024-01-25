/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserEntity } from "src/entity";
import { IUserService } from "./user.service.interface";

@Injectable()
export class UserService implements IUserService {
    readonly userRepo: Repository<UserEntity>;

    constructor(dataSource: DataSource) {
        this.userRepo = dataSource.getRepository(UserEntity);
    }
}
