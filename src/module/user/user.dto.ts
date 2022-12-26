import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({
        description: "id",
        example: "1",
    })
    id: string;

    @ApiProperty({
        description: "Email (Login ID)",
        example: "email@example.com",
    })
    email: string;

    @ApiProperty({
        description: "Name of user",
        example: "John Doe",
    })
    name: string;

    @ApiProperty({
        description: "Age of user",
        example: 30,
    })
    age: number;

    @ApiProperty({
        description: "Created date",
        example: new Date(),
    })
    createdAt: Date;

    @ApiProperty({
        description: "Updated date",
        example: new Date(),
    })
    updatedAt: Date;

    @ApiProperty({
        description: "Deleted date",
        example: null,
    })
    deletedAt: Date;
}

export class OneUserDto {
    @ApiProperty()
    user: UserDto;
}

export class ManyUsersDto {
    @ApiProperty({
        type: () => UserDto,
        isArray: true,
    })
    users: UserDto[];
}
