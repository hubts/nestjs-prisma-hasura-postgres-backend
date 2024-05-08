import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { asFailure } from "src/shared/response/as-failure";
import { FailureCodeName } from "src/shared/response/failure-code";
import { IResponse } from "src/shared/response/response.interface";

export const FailedRes = (
    failures: FailureCodeName[],
    status: HttpStatus = HttpStatus.BAD_REQUEST
) => {
    return applyDecorators(
        ApiResponse({
            status,
            content: {
                "application/json": {
                    examples: failures.reduce(
                        (list, schema) => {
                            const failure = asFailure(schema);
                            list[failure.name] = {
                                value: {
                                    success: false,
                                    code: failure.code,
                                    name: failure.name,
                                    message: failure.message,
                                },
                            };
                            return list;
                        },
                        {} as {
                            [key: string]: {
                                value: IResponse;
                            };
                        }
                    ),
                },
            },
        })
    );
};
