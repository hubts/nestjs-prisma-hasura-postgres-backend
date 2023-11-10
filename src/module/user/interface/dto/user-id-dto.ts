import { IdDto } from "src/shared/dto";
import { IUserIdResult } from "../../service";
import { ApiProperty } from "@nestjs/swagger";

export class UserIdDto implements IUserIdResult {
    @ApiProperty()
    user!: IdDto;
}
