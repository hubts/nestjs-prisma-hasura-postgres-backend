import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail } from "class-validator";
import { IsPassword } from "src/common/decorator";
import { ResponseDto } from "src/common/dto";
import {
    ILoginUserInput,
    ILoginUserOutput,
    SUCCESS_MESSAGE,
} from "src/shared/interface";
import { Random } from "src/shared/util";

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

class LoginUserResponseData implements ILoginUserOutput {
    @ApiProperty({ example: Random.lowercase(64) })
    accessToken: string;

    @ApiProperty({ example: Random.lowercase(32) })
    refreshToken: string;
}

export class LoginUserResponseDto extends ResponseDto<LoginUserResponseData> {
    message: string = SUCCESS_MESSAGE.AUTH.LOGIN_USER;
    data?: LoginUserResponseData;
}
