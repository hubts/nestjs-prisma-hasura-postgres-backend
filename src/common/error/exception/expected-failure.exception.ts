import { BadRequestException } from "@nestjs/common";
import { FailureName } from "src/shared/response/interface/response.type";
import { asFailureResponse } from "src/shared/response/util/as-failure-response";

export class ExpectedFailureException extends BadRequestException {
    constructor(name: FailureName) {
        super(name, {
            cause: asFailureResponse(name),
        });
    }
}
