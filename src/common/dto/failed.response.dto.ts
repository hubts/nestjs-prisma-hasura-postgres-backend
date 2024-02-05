import { IResponse } from "src/shared/interface";

export class FailedResponseDto implements Omit<IResponse, "data"> {
    success = false;
    code: number;
    name: string;
    message: string;

    constructor(args: Pick<FailedResponseDto, "name" | "code" | "message">) {
        const { name, code, message } = args;
        this.name = name;
        this.code = code;
        this.message = message;
    }
}
