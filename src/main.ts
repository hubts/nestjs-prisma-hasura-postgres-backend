import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, VersioningType } from "@nestjs/common";

import { AppModule } from "./app.module";
import { AppConfig } from "@config";
import { SwaggerThemePath } from "@common/swagger/theme";

import * as morgan from "morgan";
import setupSwagger from "@common/swagger/setup";

async function bootstrap() {
    const logger = new Logger("Main");

    try {
        const app = await NestFactory.create<NestExpressApplication>(AppModule);

        // CORS
        app.enableCors({
            allowedHeaders: "Content-Type",
            methods: "GET, PUT, POST, DELETE",
            credentials: true,
            origin: "*",
        });

        // Secure HTTP
        app.use(morgan("combined"));

        // API
        app.setGlobalPrefix("api");
        app.enableVersioning({
            type: VersioningType.URI,
        });

        // Swagger
        const swaggerPath = "docs";
        setupSwagger(app, swaggerPath);

        // Start
        const config = AppConfig();
        await app.listen(config.port, async () => {
            logger.log(`Application is running on ${await app.getUrl()}`);
            logger.log(`Documentation is ready: ${await app.getUrl()}/${swaggerPath}`);
        });
    } catch (error) {
        logger.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
bootstrap();
