import { ServerConfig, ServerConfigValidation } from "./server.config";
import { ThrottlerConfig, ThrottlerConfigValidation } from "./throttler.config";
import { TypeOrmConfig, TypeOrmConfigValidation } from "./typeorm.config";
import * as Joi from "joi";

export * from "./server.config";
export * from "./throttler.config";
export * from "./typeorm.config";

export * from "./service";

export const configurations = [ServerConfig, ThrottlerConfig, TypeOrmConfig];
export const validationSchema = Joi.object({
    ...ServerConfigValidation,
    ...ThrottlerConfigValidation,
    ...TypeOrmConfigValidation,
});
