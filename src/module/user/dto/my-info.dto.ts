import { ApiProperty } from "@nestjs/swagger";
import { InfoDto } from "./user-info.dto";
import { Random } from "src/shared/util/random";
import { IMyUserInfoResult, IUserResource } from "src/shared/api/user.api";

export class MyInfoDto extends InfoDto implements IMyUserInfoResult {
    @ApiProperty({
        example: Random.phoneNumber(),
    })
    mobile: string;
}

export class MyUserInfoDto implements IUserResource<MyInfoDto> {
    @ApiProperty()
    user: MyInfoDto;
}
