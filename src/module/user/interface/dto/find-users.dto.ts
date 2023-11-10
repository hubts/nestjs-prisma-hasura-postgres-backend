import { ApiProperty } from "@nestjs/swagger";
import { IFindUsersResult } from "../../service";
import { UserOneDto } from "./user-one.dto";

export class FindUsersDto implements IFindUsersResult {
    @ApiProperty()
    users!: UserOneDto[];
}
