/* eslint-disable @typescript-eslint/ban-types */
import { HttpStatus, Type } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

/**
 * API spec of method for swagger (OpenAPI used in Hasura).
 *
 * 'ApiOperation' defines a detail of the executing method, such as summary, description, and name.
 * - This is used to specify the name of the method in OpenAPI.
 * - It is used as the name of the action when importing from Hasura.
 *
 * 'ApiResponse' defines a response of the executing method.
 * - This is used to specify the status and type of response implemented.
 * - It is used as the response type of the action when importing from Hasura.
 *
 * @param type - Response type.
 * @param status - Response status code.
 */

export function ApiSpec<T extends Type<unknown>>(
    type?: T,
    status: number | "default" = HttpStatus.CREATED
) {
    return function (
        target: any,
        key: any,
        descriptor: TypedPropertyDescriptor<any>
    ) {
        ApiOperation({
            operationId: key,
        })(target, key, descriptor as any);
        ApiResponse({
            type: type as any,
            status,
        })(target, key, descriptor as any);
        return descriptor;
    };
}
