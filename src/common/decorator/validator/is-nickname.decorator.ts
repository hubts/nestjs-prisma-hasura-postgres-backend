import { registerDecorator, ValidationOptions } from "class-validator";
import { USER_PROPERTY_LENGTH } from "src/shared/constant/user.constant";

export function IsNickname(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: "isNickname",
            target: object.constructor,
            propertyName,
            options: {
                ...validationOptions,
                message: `${propertyName} must be between ${USER_PROPERTY_LENGTH.NICKNAME.MIN} and ${USER_PROPERTY_LENGTH.NICKNAME.MAX} characters long in English lowercase or number`,
            },
            validator: {
                validate(value: string): boolean {
                    const pattern = new RegExp(
                        `^[a-z|0-9]{${USER_PROPERTY_LENGTH.NICKNAME.MIN},${USER_PROPERTY_LENGTH.NICKNAME.MAX}}$`
                    );
                    return pattern.test(value);
                },
            },
        });
    };
}
