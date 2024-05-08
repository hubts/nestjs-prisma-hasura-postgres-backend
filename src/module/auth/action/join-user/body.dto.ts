import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsPhoneNumber } from "class-validator";
import { IsNickname } from "src/common/decorator/validator/is-nickname.decorator";
import { IsPassword } from "src/common/decorator/validator/is-password.decorator";
import { IJoinUserInput } from "src/shared/action/auth.action";
import { Random } from "src/shared/util/random";

export class JoinUserBodyDto implements IJoinUserInput {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: Random.email() })
    email: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({ example: Random.lowercase() })
    password: string;

    @IsNotEmpty()
    @IsNickname()
    @ApiProperty({ example: Random.nickname() })
    nickname: string;

    @IsNotEmpty()
    @IsPhoneNumber("KR")
    @ApiProperty({ example: Random.phoneNumber() })
    mobile: string;
}
