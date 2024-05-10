import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { asFailure } from "src/shared/response/as-failure";
import { FailureName } from "src/shared/response/response.code";
import { IResponse } from "src/shared/response/response.interface";

export const FailedRes = (
    failureNames: FailureName[],
    status: HttpStatus = HttpStatus.CREATED
) => {
    return applyDecorators(
        ApiResponse({
            status,
            content: {
                "application/json": {
                    examples: failureNames.reduce(
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
