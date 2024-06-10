import { registerDecorator, ValidationOptions } from "class-validator";
import {
    USER_PROPERTY_LENGTH,
    USER_PROPERTY_PATTERN,
} from "src/shared/constant/user.constant";

export function IsPassword(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "isPassword",
            target: object.constructor,
            propertyName,
            options: {
                ...validationOptions,
                message: `${propertyName} must be between ${USER_PROPERTY_LENGTH.PASSWORD.MIN} and ${USER_PROPERTY_LENGTH.PASSWORD.MAX} characters long in English lowercase or number`,
            },
            validator: {
                validate(value: string): boolean {
                    const pattern = new RegExp(USER_PROPERTY_PATTERN.PASSWORD);
                    return pattern.test(value);
                },
            },
        });
    };
}
