/* eslint-disable @typescript-eslint/ban-types */
import { Logger } from "@nestjs/common";
import { ClassConstructor, plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";

/**
 * Class decorator to validate configurations by overwriting the class constructor.
 * @param {boolean} printLogs - If true, logger is activated.
 */
export function ConfigValidation(printLogs?: boolean) {
    return (constructor: ClassConstructor<object>): any => {
        const newConstructor = function () {
            const { config, errors } = validate(constructor);

            if (errors.length > 0) {
                if (printLogs) {
                    logValidationErrors(constructor.name, errors);
                }
                throw new Error(errors.toString());
            }

            return config;
        };
        newConstructor.prototype = constructor.prototype;
        return newConstructor;
    };
}

/**
 * Validate the configuration object.
 * @param envClass - Environment class defined.
 * @returns Validated configurations and errors.
 */
const validate = <T extends object>(
    envClass: ClassConstructor<T>
): {
    config: T;
    errors: ValidationError[];
} => {
    /**
     * If 'enableImplicitConversion' option is true, all string values are interpreted as 'true', even the string 'false'.
     * Thus, to avoid this issue in 'class-transformer', must use '@Transform' for boolean values.
     */
    const config = plainToInstance(envClass, process.env, {
        excludeExtraneousValues: true, // Exclude undefined variables in class (It forces to use '@Expose' decorator to expose values).
        enableImplicitConversion: true, // Enable implicit(automatic) conversion.
    });

    const errors = validateSync(config, {
        skipMissingProperties: false,
    });

    return {
        config,
        errors,
    };
};

/**
 * Log the errors in validation.
 * @param context - Context name, such like a class name.
 * @param errors - Validation errors.
 */
const logValidationErrors = (context: string, errors: ValidationError[]) => {
    const logger = new Logger(context);
    errors.map(error => {
        if (!!error.constraints) {
            Object.entries(error.constraints).map(([key, value]) => {
                logger.warn(`(${key}) ${value}`); // Warning errors
            });
        }
    });
};
