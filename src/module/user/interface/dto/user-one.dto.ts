import { ApiProperty } from "@nestjs/swagger";
import { IUserOneResult } from "../../service";
import { Random } from "src/shared/util";

export class UserOneDto implements IUserOneResult {
    @ApiProperty({ example: Random.uuid() })
    id!: string;

    @ApiProperty({ example: Random.nickname() })
    nickname!: string;

    @ApiProperty({ example: Random.email() })
    email!: string;
}
