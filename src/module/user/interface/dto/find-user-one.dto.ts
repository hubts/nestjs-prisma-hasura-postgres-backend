import { ApiProperty } from "@nestjs/swagger";
import { IFindUserOneResult } from "../../service";
import { UserOneDto } from "./user-one.dto";

export class FindUserOneDto implements IFindUserOneResult {
    @ApiProperty()
    user!: UserOneDto;
}
