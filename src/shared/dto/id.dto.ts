import { ApiProperty } from "@nestjs/swagger";
import { Random } from "../util";

export interface IdResult {
    id: string;
}

export class IdDto implements IdResult {
    @ApiProperty({
        example: Random.uuid(),
    })
    id!: string;
}
