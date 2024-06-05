import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IUserEmailParam } from "src/shared/api/user.api";
import { Random } from "src/shared/util/random";

export class UserEmailParam implements IUserEmailParam {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: Random.email(),
    })
    email: string;
}
