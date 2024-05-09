import { asFailure } from "src/shared/response/as-failure";
import { FailureCode, FailureCodeName } from "src/shared/response/failure-code";
import { IResponse, SuccessCode } from "src/shared/response/response.interface";

export class FailureRes implements Omit<IResponse, "data"> {
    success = false;
    code: typeof SuccessCode | FailureCode;
    name: string;
    message: string;

    constructor(name: FailureCodeName) {
        const failure = asFailure(name);
        this.code = failure.code;
        this.name = failure.name;
        this.message = failure.message;
    }
}
