import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { FAIL, IResponse } from "src/shared/interface";

export const ApiFailedRes = <T extends typeof FAIL[keyof typeof FAIL]>(
    status = HttpStatus.BAD_REQUEST,
    ...fails: T[]
) => {
    return applyDecorators(
        ApiResponse({
            status,
            content: {
                "application/json": {
                    examples: fails.reduce(
                        (list, schema) => {
                            list[schema.name] = {
                                value: {
                                    success: false,
                                    data: undefined,
                                    ...schema,
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
