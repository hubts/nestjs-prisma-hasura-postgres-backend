import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@shared/model";
import { Random } from "@shared/util";
import { Exclude } from "class-transformer";
import { IUser } from "./user.interface";

export class UserDto extends BaseDto implements IUser {
    @ApiProperty({
        description: "Email (Login ID)",
        example: Random.email(),
    })
    email: string;

    @Exclude()
    password: string;

    @ApiProperty({
        description: "Name of user",
        example: Random.nickname(),
    })
    name: string;

    @ApiProperty({
        description: "Age of user",
        example: Random.number(20, 50),
    })
    age: number;
}

export class OneUserDto {
    @ApiProperty()
    user: UserDto;
}

export class ManyUsersDto {
    @ApiProperty({
        type: () => UserDto,
        isArray: true,
    })
    users: UserDto[];
}
