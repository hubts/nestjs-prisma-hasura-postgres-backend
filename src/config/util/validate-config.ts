import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";
import { ClassConstructor } from "class-transformer/types/interfaces";
import { Logger } from "@nestjs/common";

export function validateConfig<T extends object>(
    config: Record<string, unknown>,
    envVariablesClass: ClassConstructor<T>
) {
    const logger = new Logger(envVariablesClass.name);
    const validatedConfig = plainToClass(envVariablesClass, config, {
        enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
        skipMissingProperties: false,
    });

    if (errors.length > 0) {
        errors.map(error => {
            if (!!error.constraints) {
                Object.entries(error.constraints).map(([key, value]) => {
                    logger.warn(`(${key}) ${value}`);
                });
            }
        });
        throw new Error(errors.toString());
    }

    return validatedConfig;
}
