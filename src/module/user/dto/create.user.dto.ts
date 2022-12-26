import { ApiProperty } from "@nestjs/swagger";
import { Random } from "@shared/util";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "Email",
        example: Random.email(),
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password",
        example: Random.string(10),
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description: "Name",
        example: Random.nickname(),
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Age",
        example: Random.number(20, 50),
    })
    @IsNotEmpty()
    @IsNumber()
    age: number;
}
