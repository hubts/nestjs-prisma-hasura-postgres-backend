import { Injectable } from "@nestjs/common";
import { UserEntity } from "src/entity";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<UserEntity> {}
