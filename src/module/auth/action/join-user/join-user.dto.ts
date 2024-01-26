import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";
import { IsNickname, IsPassword } from "src/common/decorator";
import { ResponseDto } from "src/common/dto";
import { IJoinUserInput, IJoinUserOutput } from "src/shared/interface";
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

// export class JoinUserResponseDto implements IJoinUserOutput {
//     accessToken: string;
//     refreshToken: string;
// }

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

// 1. IOutput 인터페이스를 구현하는 형태
// export class JoinUserResponseDto implements IJoinUserOutput {
//     success: boolean;
//     code: number;
//     message: string;
//     data?: IJoinUserOutputData;
// }

// 2. ResponseDto 클래스를 확장하는 방법
export class JoinUserResponseDto extends ResponseDto<IJoinUserOutput> {}
