import { ApiProperty } from "@nestjs/swagger";
import { BaseDto } from "@shared/model";
import { RandomUtil } from "@shared/util";
import { Exclude } from "class-transformer";
import { IUser } from "./user.interface";

export class UserDto extends BaseDto implements Partial<IUser> {
    @ApiProperty({
        description: "Email (Login ID)",
        example: RandomUtil.email(),
    })
    email!: string;

    @Exclude()
    password?: string;

    @ApiProperty({
        description: "Name of user",
        example: RandomUtil.nickname(),
    })
    name!: string;

    @ApiProperty({
        description: "Age of user",
        example: RandomUtil.range(20, 70),
    })
    age!: number;
}

export class OneUserDto {
    @ApiProperty()
    user!: UserDto;
}

export class ManyUsersDto {
    @ApiProperty({
        type: () => UserDto,
        isArray: true,
    })
    users!: UserDto[];
}
