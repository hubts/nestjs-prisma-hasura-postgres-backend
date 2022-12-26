import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({
        description: "Name",
        example: "John Doe",
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Age",
        example: 30,
    })
    @IsOptional()
    @IsNumber()
    age: number;
}
