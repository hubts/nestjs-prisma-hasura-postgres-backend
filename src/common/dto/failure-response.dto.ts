import {
    FailureName,
    ResponseCode,
    ResponseName,
} from "src/shared/response/interface/response.type";
import { asFailureResponse } from "src/shared/response/util/as-failure-response";
import { IResponse } from "src/shared/response/interface/response.interface";

export class FailureResponseDto implements IResponse<null> {
    success: boolean;
    code: ResponseCode;
    name: ResponseName;
    message: string;
    data: null;

    constructor(name: FailureName) {
        const failureResponse = asFailureResponse(name);
        this.success = failureResponse.success;
        this.code = failureResponse.code;
        this.name = failureResponse.name;
        this.message = failureResponse.message;
        this.data = null;
    }
}
