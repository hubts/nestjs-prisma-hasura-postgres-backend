import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";
import { IsNickname, IsPassword } from "src/common/decorator";
import { ResponseDto } from "src/common/dto";
import {
    IJoinUserInput,
    IJoinUserOutput,
    SUCCESS_MESSAGE,
} from "src/shared/interface";
import { Random } from "src/shared/util";

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

class JoinUserResponseData implements IJoinUserOutput {
    @ApiProperty({ example: Random.lowercase(64) })
    accessToken: string;

    @ApiProperty({ example: Random.lowercase(32) })
    refreshToken: string;
}

export class JoinUserResponseDto extends ResponseDto<JoinUserResponseData> {
    message = SUCCESS_MESSAGE.AUTH.JOIN_USER;
    data?: JoinUserResponseData;
}
