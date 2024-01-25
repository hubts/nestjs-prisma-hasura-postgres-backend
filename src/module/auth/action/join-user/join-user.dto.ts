import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsNickname, IsPassword } from "src/common/decorator";
import {
    IJoinUserInput,
    IJoinUserOutput,
    IJoinUserOutputData,
} from "src/shared/interface";
import { Random } from "src/shared/util";

export class JoinUserBodyDto implements IJoinUserInput {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        example: Random.email(),
    })
    email: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({
        example: Random.lowercase(),
    })
    password: string;

    @IsNotEmpty()
    @IsNickname()
    @ApiProperty({
        example: Random.lowercase(),
    })
    nickname: string;
}

// export class JoinUserResponseDtoData implements IJoinUserOutputData {
//     @ApiProperty({
//         example: Random.lowercase(64),
//     })
//     accessToken: string;

//     @ApiProperty({
//         example: Random.lowercase(REFRESH_TOKEN_LENGTH),
//     })
//     refreshToken: string;
// }

export class JoinUserResponseDto implements IJoinUserOutput {
    success: boolean;
    code: number;
    message: string;
    data?: IJoinUserOutputData;
}
