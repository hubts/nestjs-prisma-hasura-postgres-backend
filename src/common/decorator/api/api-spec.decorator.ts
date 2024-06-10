import { ApiOperation } from "@nestjs/swagger";

interface ApiSpecOptions {
    summary?: string;
    description?: string[];
    deprecated?: boolean;
}

export const ApiSpec = (options?: ApiSpecOptions): MethodDecorator => {
    return <T>(
        target: object,
        key: string | symbol,
        descriptor: TypedPropertyDescriptor<T>
    ) => {
        ApiOperation({
            operationId: key.toString(),
            summary: options?.summary ?? "",
            description: options?.description?.join("\n\n") ?? "",
            deprecated: options?.deprecated ?? false,
        })(target, key, descriptor);

        return descriptor;
    };
};
