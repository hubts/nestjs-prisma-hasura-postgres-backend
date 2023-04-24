import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { entities } from "@shared/model";
import * as Joi from "joi";

export const TypeOrmConfig = registerAs(
    "typeorm",
    (): TypeOrmModuleOptions => ({
        type: (process.env.DB_TYPE as any) || "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "password",
        database: process.env.DB_NAME || "postgres",
        synchronize: process.env.DB_SYNC === "true",
        logging: process.env.DB_LOGGING === "true",
        schema: process.env.DB_SCHEMA || "public",
        entities: [...entities],
        autoLoadEntities: true,
    })
);

export const TypeOrmConfigValidation = {
    DB_TYPE: Joi.string().required(),
    DB_HOST: Joi.string().required(),
    DB_PORT: Joi.number().port().required(),
    DB_USERNAME: Joi.string().required(),
    DB_PASSWORD: Joi.string().required(),
    DB_NAME: Joi.string().required(),
    DB_SYNC: Joi.boolean().required(),
    DB_LOGGING: Joi.boolean().required(),
    DB_SCHEMA: Joi.string().required(),
};
