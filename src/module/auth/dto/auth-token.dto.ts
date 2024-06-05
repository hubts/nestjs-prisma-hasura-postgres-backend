import { ApiProperty } from "@nestjs/swagger";
import { IAuthTokenResult } from "src/shared/api/auth.api";
import { Random } from "src/shared/util/random";

export class AuthTokenDto implements IAuthTokenResult {
    @ApiProperty({ example: Random.lowercase(64) })
    accessToken: string;

    @ApiProperty({ example: Random.lowercase(32) })
    refreshToken: string;
}
