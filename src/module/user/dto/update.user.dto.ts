import { ApiProperty } from "@nestjs/swagger";
import { RandomUtil } from "@shared/util";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: RandomUtil.nickname(),
    })
    name?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: "Age",
        example: RandomUtil.range(20, 70),
    })
    age?: number;
}
