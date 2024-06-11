import { applyDecorators, HttpStatus, Type } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";
import { SuccessResponseDto } from "src/common/dto/success-response.dto";

// Options interface
interface SuccessResOptions {
    status?: HttpStatus;
    description?: string;
}

/**
 * To set response with generic type in Swagger,
 * A common success response and our generic typed response are used.
 *
 * @param genericDataType - Generic type of response to fit into a common success response.
 * @param options - Options for ApiResponse decorator.
 */
export const SuccessRes = (
    message: string,
    genericDataType: Type | null,
    options?: SuccessResOptions
) => {
    return applyDecorators(
        !!genericDataType
            ? ApiExtraModels(SuccessResponseDto, genericDataType)
            : ApiExtraModels(SuccessResponseDto),
        ApiResponse({
            status: options?.status ?? HttpStatus.OK,
            description: options?.description ?? "Successful response",
            content: {
                "application/json": {
                    schema: {
                        allOf: [
                            { $ref: getSchemaPath(SuccessResponseDto) },
                            {
                                properties: {
                                    message: {
                                        example: message,
                                    },
                                    data: !!genericDataType
                                        ? {
                                              $ref: getSchemaPath(
                                                  genericDataType
                                              ),
                                          }
                                        : { example: null },
                                },
                            },
                        ],
                    },
                },
            },
        })
    );
};
