/* eslint-disable @typescript-eslint/ban-types */
import { JwtRolesAuth } from "../auth";
import {
    ApiOperation,
    ApiResponse,
    ApiResponseMetadata,
} from "@nestjs/swagger";
import { UserRole } from "src/shared/enum";

export const HasuraActionHandler = (input: {
    permissions: UserRole[];
    responseType?: ApiResponseMetadata["type"];
}): MethodDecorator => {
    const { permissions, responseType } = input;
    return <T>(
        target: Object,
        key: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ) => {
        // Set the method name as 'Action Name'
        ApiOperation({
            operationId: key as string,
        })(target, key, descriptor);

        // If has permissions, set them
        if (permissions.length) {
            JwtRolesAuth(...permissions)(target, key, descriptor);
        }

        // If has response, set them
        if (responseType) {
            ApiResponse({
                type: responseType,
            });
        }

        return descriptor;
    };
};
