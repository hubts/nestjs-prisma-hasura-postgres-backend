import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
import { IsPassword } from "src/common/decorator/validator/is-password.decorator";
import { IUserLoginDto } from "src/shared/api/auth.api";
import { Random } from "src/shared/util/random";

export class UserLoginDto implements IUserLoginDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: Random.email() })
    email: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({ example: Random.lowercase() })
    password: string;
}
