import { ApiProperty } from "@nestjs/swagger";
import { Random } from "@shared/util";
import { Exclude } from "class-transformer";

export class BaseDto {
    @ApiProperty({
        description: "id",
        example: Random.uuid(),
    })
    id: string;

    @ApiProperty({
        description: "Created date",
        example: Random.date(3, true),
    })
    createdAt: Date;

    @ApiProperty({
        description: "Updated date",
        example: Random.date(1, true),
    })
    updatedAt: Date;

    @Exclude()
    deletedAt: Date;
}
