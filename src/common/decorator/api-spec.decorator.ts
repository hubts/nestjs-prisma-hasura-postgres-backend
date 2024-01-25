/* eslint-disable @typescript-eslint/ban-types */
import { HttpStatus, Type } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

export function ApiSpec(
    type?: Type<unknown> | Function | [Function] | string,
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
            status: status as any,
        })(target, key, descriptor as any);
        return descriptor;
    };
}
