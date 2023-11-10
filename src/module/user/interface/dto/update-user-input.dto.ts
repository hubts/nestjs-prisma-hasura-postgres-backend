import { IsEmail, IsOptional } from "class-validator";
import { IUpdateUserInput } from "../../service";
import { ApiProperty } from "@nestjs/swagger";
import { Random } from "src/shared/util";
import { IsNickname } from "src/common/decorator";

export class UpdateUserInputDto implements IUpdateUserInput {
    @IsOptional()
    @IsEmail()
    @ApiProperty({
        example: Random.email(),
        required: false,
    })
    email?: string;

    @IsOptional()
    @IsNickname()
    @ApiProperty({
        example: Random.nickname(),
        required: false,
    })
    nickname?: string;
}
