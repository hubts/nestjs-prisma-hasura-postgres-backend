import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { IUserIdParam } from "src/shared/api/user.api";
import { Random } from "src/shared/util/random";

export class UserIdParam implements IUserIdParam {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty({
        example: Random.uuid(),
    })
    id: string;
}
