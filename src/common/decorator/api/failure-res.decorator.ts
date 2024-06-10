import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { IResponse } from "src/shared/response/interface/response.interface";
import { FailureName } from "src/shared/response/interface/response.type";
import { asFailureResponse } from "src/shared/response/util/as-failure-response";

interface FailureExample {
    name: FailureName;
    description?: string;
}

// Options interface
interface FailureResOptions {
    status?: HttpStatus;
    description?: string;
}

export const FailureRes = (
    examples: FailureExample[],
    options?: FailureResOptions
) => {
    return applyDecorators(
        ApiResponse({
            status: options?.status ?? HttpStatus.BAD_REQUEST,
            description: options?.description ?? "Failures",
            content: {
                "application/json": {
                    examples: examples.reduce(
                        (list, example) => {
                            const failure = asFailureResponse(example.name);
                            list[failure.name] = {
                                value: {
                                    success: false,
                                    code: failure.code,
                                    name: failure.name,
                                    message: failure.message,
                                    data: null,
                                },
                                description:
                                    example.description ?? failure.message,
                            };
                            return list;
                        },
                        {} as {
                            [key: string]: {
                                value: IResponse<null>;
                                description: string;
                            };
                        }
                    ),
                },
            },
        })
    );
};
