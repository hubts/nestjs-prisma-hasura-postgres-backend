import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
import { IUserRefreshDto } from "src/shared/api/auth.api";
import { Random } from "src/shared/util/random";

export class UserRefreshDto implements IUserRefreshDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: Random.hex(16) })
    refreshToken: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({ example: Random.uuid() })
    id: string;
}
