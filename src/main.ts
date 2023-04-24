import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, VersioningType } from "@nestjs/common";

import { AppModule } from "./app.module";

import * as morgan from "morgan";
import setupSwagger from "@common/swagger/setup";
import { ServerConfig } from "@config";

async function run() {
    const logger = new Logger("Main");

    try {
        /**
         * Application and configuration
         */
        const app = await NestFactory.create<NestExpressApplication>(AppModule);
        const config = ServerConfig();

        /**
         * CORS
         */
        app.enableCors({
            allowedHeaders: "Content-Type",
            methods: "GET, PUT, POST, DELETE",
            credentials: true,
            origin: "*",
        });

        /**
         * Logging middleware
         */
        app.use(morgan(config.isProduction ? "combined" : "dev"));

        /**
         * API prefix and versioning
         */
        app.setGlobalPrefix("api");
        app.enableVersioning({
            type: VersioningType.URI,
        });

        /**
         * Swagger
         */
        const swaggerPath = "docs";
        setupSwagger(app, swaggerPath);

        /**
         * Start
         */
        await app.listen(config.port, async () => {
            logger.log(`Application is running on ${await app.getUrl()}`);
            logger.log(`Documentation is ready: ${await app.getUrl()}/${swaggerPath}`);
        });
    } catch (error) {
        logger.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
run();
