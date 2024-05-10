import { asFailure } from "src/shared/response/as-failure";
import { FailureName, ResponseCode } from "src/shared/response/response.code";
import { IResponse } from "src/shared/response/response.interface";

export class FailureRes implements Omit<IResponse, "data"> {
    success = false;
    code: ResponseCode;
    name: string;
    message: string;

    constructor(name: FailureName) {
        const failure = asFailure(name);
        this.code = failure.code;
        this.name = failure.name;
        this.message = failure.message;
    }
}
