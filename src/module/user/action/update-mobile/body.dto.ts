import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";
import { IUpdateMobileInput } from "src/shared/action/user.action";
import { Random } from "src/shared/util/random";

export class UpdateMobileBodyDto implements IUpdateMobileInput {
    @IsNotEmpty()
    @IsPhoneNumber("KR")
    @ApiProperty({
        example: Random.phoneNumber(),
    })
    mobile: string;
}
