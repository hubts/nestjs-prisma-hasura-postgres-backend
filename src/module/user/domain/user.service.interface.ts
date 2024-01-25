import { UserEntity } from "src/entity";
import { Repository } from "typeorm";

export interface IUserService {
    userRepo: Repository<UserEntity>;
}
