/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ApiProperty } from "@nestjs/swagger";
import { IResponse } from "src/shared/interface";

export class ResponseDto<T> implements IResponse<T> {
    constructor(input: { code?: number; message?: string; data?: T }) {
        const { code, message, data } = input;
        if (code) this.code = code;
        if (message) this.message = message;
        if (data) this.data = data;
    }

    @ApiProperty({
        example: true,
    })
    success: boolean = true;

    @ApiProperty({
        example: 1000,
    })
    code: number = 1000;

    @ApiProperty({
        example: "This is a message.",
    })
    message: string;

    @ApiProperty()
    data?: T;
}
