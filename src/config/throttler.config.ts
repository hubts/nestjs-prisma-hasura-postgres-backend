import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions } from "@nestjs/throttler";
import * as Joi from "joi";

export const ThrottlerConfig = registerAs(
    "throttler",
    (): ThrottlerModuleOptions => ({
        ttl: parseInt(process.env.THROTTLER_TTL || "60"),
        limit: parseInt(process.env.THROTTLER_LIMIT || "1000"),
    })
);

export const ThrottlerConfigValidation = {
    THROTTLER_TTL: Joi.optional(),
    THROTTLER_LIMIT: Joi.optional(),
};
