import { IsEmail, IsNotEmpty } from "class-validator";
import { ICreateUserInput } from "../../service";
import { ApiProperty } from "@nestjs/swagger";
import { Random } from "src/shared/util";
import { IsNickname, IsPassword } from "src/common/decorator";

export class CreateUserInputDto implements ICreateUserInput {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: Random.email(),
    })
    email!: string;

    @IsNotEmpty()
    @IsNickname()
    @ApiProperty({
        example: Random.nickname(),
    })
    nickname!: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({
        example: Random.string(16),
    })
    password!: string;
}
