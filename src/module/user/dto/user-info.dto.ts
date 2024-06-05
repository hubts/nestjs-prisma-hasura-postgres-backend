import { ApiProperty } from "@nestjs/swagger";
import { IUserInfoResult, IUserResource } from "src/shared/api/user.api";
import { Random } from "src/shared/util/random";

class InfoDto implements IUserInfoResult {
    @ApiProperty({
        description: "User ID",
        example: Random.uuid(),
    })
    id: string;

    @ApiProperty({
        description: "When you joined at",
        example: Random.dateBetween(),
    })
    joinedAt: Date;

    @ApiProperty({
        example: Random.email(),
    })
    email: string;

    @ApiProperty({
        example: Random.nickname(),
    })
    nickname: string;
}

export class UserInfoDto implements IUserResource<InfoDto> {
    @ApiProperty()
    user: InfoDto;
}
