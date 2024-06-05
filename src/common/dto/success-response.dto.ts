import { IResponse } from "src/shared/response/interface/response.interface";
import {
    ResponseCode,
    SuccessCode,
    SuccessName,
} from "src/shared/response/interface/response.type";
import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponseDto<T = null> implements IResponse<T> {
    @ApiProperty({
        example: true,
    })
    success = true;

    @ApiProperty({
        example: SuccessCode,
    })
    code = SuccessCode as ResponseCode;

    @ApiProperty({
        example: SuccessName,
    })
    name = SuccessName;

    @ApiProperty()
    message: string;

    data: T | null;

    constructor(message: string, data?: T) {
        this.message = message;
        this.data = data ?? null;
    }
}
