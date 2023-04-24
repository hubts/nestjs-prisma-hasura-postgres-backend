import { ApiProperty } from "@nestjs/swagger";
import { Random } from "@shared/util";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: Random.nickname(),
    })
    name?: string;

    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description: "Age",
        example: Random.number(20, 50),
    })
    age?: number;
}
