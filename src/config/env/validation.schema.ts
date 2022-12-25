import * as Joi from "joi";

export const ValidationSchema = Joi.object({
    PORT: Joi.number().required(),
    // Database
    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_SYNC: Joi.boolean().required(),
    DB_LOGGING: Joi.boolean().required(),
    DB_SCHEMA: Joi.string().required(),
});
