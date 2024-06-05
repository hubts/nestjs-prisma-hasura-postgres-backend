import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { IResponse } from "src/shared/response/interface/response.interface";
import { FailureName } from "src/shared/response/interface/response.type";
import { asFailureResponse } from "src/shared/response/util/as-failure-response";

export const FailureRes = (failureNames: FailureName[]) => {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            content: {
                "application/json": {
                    examples: failureNames.reduce(
                        (list, schema) => {
                            const failure = asFailureResponse(schema);
                            list[failure.name] = {
                                value: {
                                    success: false,
                                    code: failure.code,
                                    name: failure.name,
                                    message: failure.message,
                                    data: null,
                                },
                            };
                            return list;
                        },
                        {} as {
                            [key: string]: {
                                value: IResponse<null>;
                            };
                        }
                    ),
                },
            },
        })
    );
};
