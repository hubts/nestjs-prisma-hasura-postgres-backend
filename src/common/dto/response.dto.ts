import { ApiProperty } from "@nestjs/swagger";
import { FailureCode } from "src/shared/response/failure-code";
import { IResponse, SuccessCode } from "src/shared/response/response.interface";

export class ResponseDto<T> implements IResponse<T> {
    @ApiProperty({
        type: Boolean,
    }) // NI: only for the pretty print in swagger
    success = true;

    @ApiProperty({
        type: Number,
    }) // NI: only for the pretty print in swagger
    code: typeof SuccessCode | FailureCode = 1000;

    @ApiProperty({
        type: String,
    }) // NI: only for the pretty print in swagger
    name = "success";

    @ApiProperty()
    message: string;

    data?: T;

    constructor(data?: T) {
        if (data) this.data = data;
    }
}
