import { ApiProperty } from "@nestjs/swagger";
import { RandomUtil } from "@shared/util";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description: "Email",
        example: RandomUtil.email(),
    })
    email!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Password",
        example: RandomUtil.alphabets(10),
    })
    password!: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Name",
        example: RandomUtil.nickname(),
    })
    name!: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description: "Age",
        example: RandomUtil.range(20, 50),
    })
    age!: number;
}
