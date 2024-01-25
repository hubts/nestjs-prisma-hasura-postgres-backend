import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import {
    IUpdatePasswordInput,
    IUpdatePasswordOutput,
    IUpdatePasswordOutputData,
} from "src/shared/interface";
import { Random } from "src/shared/util";

export class UpdatePasswordBodyDto implements IUpdatePasswordInput {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: Random.lowercase(),
    })
    originalPassword: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        example: Random.lowercase(),
    })
    newPassword: string;
}

export class UpdatePasswordResponseDto implements IUpdatePasswordOutput {
    success: boolean;
    code: number;
    message: string;
    data?: IUpdatePasswordOutputData;
}
