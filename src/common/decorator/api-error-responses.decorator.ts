import { applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { ERROR } from "src/shared/interface";

export function ApiErrorResponses<T extends typeof ERROR[keyof typeof ERROR]>(
    errors: T[]
) {
    return applyDecorators(
        ...errors.map(error => {
            return ApiResponse({
                status: error.code,
                description: error.message,
                schema: {
                    example: error,
                },
            });
        })
    );
}
