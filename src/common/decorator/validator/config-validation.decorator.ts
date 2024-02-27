/* eslint-disable @typescript-eslint/ban-types */
import { Logger } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ValidationError, validateSync } from "class-validator";

export function ConfigValidation<T extends { new (...args: any[]): {} }>(
    constructor: T
) {
    return class extends constructor {
        constructor(...args: any[]) {
            /**
             * If 'enableImplicitConversion' option is true, all string values are interpreted as 'true', even the string 'false'.
             * Thus, to avoid this issue in 'class-transformer', must use '@Transform' for boolean properties.
             * - Check the examples of boolean configuration properties.
             */
            const config = plainToInstance(constructor, process.env, {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            });

            const errors = validateSync(config, {
                skipMissingProperties: false,
            });

            if (errors.length > 0) {
                logValidationErrors(constructor.name, errors);
                throw new Error(errors.toString());
            }

            super(args);
            return config;
        }
    };
}

const logValidationErrors = (context: string, errors: ValidationError[]) => {
    const logger = new Logger(context);
    errors.map(error => {
        if (!!error.constraints) {
            Object.entries(error.constraints).map(([key, value]) => {
                logger.warn(`(${key}) ${value}`);
            });
        }
    });
};
