import { HttpException, HttpStatus } from "@nestjs/common";
import { FailureName } from "src/shared/response/interface/response.type";
import { asFailureResponse } from "src/shared/response/util/as-failure-response";

export class ExpectedFailureException extends HttpException {
    constructor(name: FailureName, statusCode = HttpStatus.BAD_REQUEST) {
        const failure = asFailureResponse(name);
        super(
            {
                statusCode,
                message: failure.message,
            },
            statusCode,
            {
                cause: asFailureResponse(name),
            }
        );
    }
}
