import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/shared/interface";

export class ResponseDto<T> implements IResponse<T> {
    @ApiProperty({
        type: Boolean,
    }) // NI: only for the pretty print in swagger
    success = true;

    @ApiProperty({
        type: Number,
    }) // NI: only for the pretty print in swagger
    code = 1000;

    @ApiProperty({
        type: String,
    }) // NI: only for the pretty print in swagger
    name = "success";

    @ApiProperty()
    message: string;

    data?: T;

    constructor(args: Pick<ResponseDto<T>, "message" | "data">) {
        const { message, data } = args;
        this.message = message;
        if (data) this.data = data;
    }
}
