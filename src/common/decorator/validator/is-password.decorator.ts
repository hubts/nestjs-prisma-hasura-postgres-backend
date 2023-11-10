import { registerDecorator, ValidationOptions } from "class-validator";

export function IsPassword(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "isPassword",
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...validationOptions,
                message: `${propertyName} must be between 4 and 20 characters long in English lowercase or number`,
            },
            validator: {
                validate(value: string): boolean {
                    return /^[a-z|0-9]{4,20}$/.test(value);
                },
            },
        });
    };
}
