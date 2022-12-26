import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        description: "Email",
        example: "email@example.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "Password",
        example: "1234",
    })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({
        description: "Name",
        example: "John Doe",
    })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        description: "Age",
        example: 30,
    })
    @IsNotEmpty()
    @IsNumber()
    age: number;
}
