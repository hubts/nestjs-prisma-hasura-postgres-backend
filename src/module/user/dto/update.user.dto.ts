import { ApiProperty } from "@nestjs/swagger";
import { Random } from "@shared/util";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: "Name",
        example: Random.nickname(),
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Age",
        example: Random.number(20, 50),
    })
    @IsOptional()
    @IsNumber()
    age: number;
}
