import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
import { IsPassword } from "src/common/decorator/validator/is-password.decorator";
import { ILoginUserInput } from "src/shared/action/auth.action";
import { Random } from "src/shared/util/random";

export class LoginUserBodyDto implements ILoginUserInput {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: Random.email() })
    email: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({ example: Random.lowercase() })
    password: string;
}
