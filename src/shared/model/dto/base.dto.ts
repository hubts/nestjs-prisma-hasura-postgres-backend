import { ApiProperty } from "@nestjs/swagger";
import { RandomUtil } from "@shared/util";
import { Exclude } from "class-transformer";
import { IBase } from "../interface/base.interface";

export class BaseDto implements IBase {
    @ApiProperty({
        description: "id",
        example: RandomUtil.uuid(),
    })
    id!: string;

    @ApiProperty({
        description: "Created date",
        example: RandomUtil.dateBetween(new Date(), -5),
    })
    createdAt!: Date;

    @ApiProperty({
        description: "Updated date",
        example: RandomUtil.dateBetween(new Date(), 0),
    })
    updatedAt!: Date;

    @Exclude()
    deletedAt?: Date | null;
}
