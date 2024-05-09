import { ApiProperty } from "@nestjs/swagger";
import { SuccessRes } from "src/common/dto/success.res";
import { ITokenOutput } from "src/shared/action/auth.action";
import { SUCCESS_MESSAGE } from "src/shared/response/success-message";
import { Random } from "src/shared/util/random";

class TokenData implements ITokenOutput {
    @ApiProperty({ example: Random.lowercase(64) })
    accessToken: string;

    @ApiProperty({ example: Random.lowercase(32) })
    refreshToken: string;
}

export class JoinUserResponseDto extends SuccessRes<TokenData> {
    message = SUCCESS_MESSAGE.AUTH.JOIN_USER;
    data?: TokenData;
}
