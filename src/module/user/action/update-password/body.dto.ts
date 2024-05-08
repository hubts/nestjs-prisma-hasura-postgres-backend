import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { IsPassword } from "src/common/decorator/validator/is-password.decorator";
import { IUpdatePasswordInput } from "src/shared/action/user.action";
import { Random } from "src/shared/util/random";

export class UpdatePasswordBodyDto implements IUpdatePasswordInput {
    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({
        example: Random.lowercase(10),
    })
    originalPassword: string;

    @IsNotEmpty()
    @IsPassword()
    @ApiProperty({
        example: Random.lowercase(10),
    })
    newPassword: string;
}
