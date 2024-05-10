import { ApiProperty } from "@nestjs/swagger";
import {
    ResponseCode,
    SuccessCode,
    SuccessName,
} from "src/shared/response/response.code";
import { IResponse } from "src/shared/response/response.interface";

export class SuccessRes<T> implements IResponse<T> {
    @ApiProperty({
        type: Boolean,
    }) // NI: only for the pretty print in swagger
    success = true;

    @ApiProperty({
        type: Number,
        example: SuccessCode,
    }) // NI: only for the pretty print in swagger
    code: ResponseCode = SuccessCode;

    @ApiProperty({
        type: String,
        example: SuccessName,
    }) // NI: only for the pretty print in swagger
    name: string = SuccessName;

    @ApiProperty()
    message: string;

    data?: T;

    constructor(data?: T) {
        if (data) this.data = data;
    }
}
