import { registerAs } from "@nestjs/config";
import * as Joi from "joi";

export const ServerConfig = registerAs("server", () => ({
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT || "8000"),
    isProduction: process.env.NODE_ENV === "production",
}));

export const ServerConfigValidation = {
    NODE_ENV: Joi.string().valid("local", "development", "production").required(),
    PORT: Joi.number().port().required(),
};
