import { ApiProperty } from "@nestjs/swagger";
import { Random } from "@shared/util";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: "Email",
        example: Random.email(),
    })
    email!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Password",
        example: Random.string(10),
    })
    password!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: Random.nickname(),
    })
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Age",
        example: Random.number(20, 50),
    })
    age!: number;
}
