import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, VersioningType } from "@nestjs/common";

import { AppModule } from "./app.module";

import { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { ServerConfig } from "./config";
import { setupSwagger } from "./common/swagger";
import { CustomLogger } from "./common/logger";

async function run() {
    const logger = new Logger("Main");

    try {
        /**
         * Application and configuration
         */
        const app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            {
                bufferLogs: true,
                abortOnError: true,
            }
        );
        const serverConfig = ServerConfig();

        /**
         * Custom logger
         */
        app.useLogger(app.get(CustomLogger));

        /**
         * Limitation of input JSON size
         */
        app.use(json({ limit: "256kb" }));

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
         * Secure HTTP header
         */
        app.use(helmet());
        app.use(compression());

        /**
         * Logging middleware (optional)
         */
        app.use(morgan(serverConfig.isProduction ? "combined" : "dev"));

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
        await app.listen(serverConfig.port, async () => {
            logger.log(`Application is running on ${await app.getUrl()}`);
            logger.log(
                `Documentation is ready: ${await app.getUrl()}/${swaggerPath}`
            );
        });
    } catch (error) {
        logger.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
run();
