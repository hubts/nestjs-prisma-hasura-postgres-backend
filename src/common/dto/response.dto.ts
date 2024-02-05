/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/shared/interface";

export class ResponseDto<T> implements IResponse<T> {
    @ApiProperty() // NI: only for the pretty print in swagger
    success: boolean = true;

    @ApiProperty() // NI: only for the pretty print in swagger
    code: number = 1000;

    @ApiProperty() // NI: only for the pretty print in swagger
    name: string = "success";

    @ApiProperty()
    message: string;

    data?: T;

    constructor(args: Pick<ResponseDto<T>, "message" | "data">) {
        const { message, data } = args;
        this.message = message;
        if (data) this.data = data;
    }
}
