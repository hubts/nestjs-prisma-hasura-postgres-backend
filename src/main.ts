import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger, VersioningType } from "@nestjs/common";
import { AppConfig } from "@config";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SwaggerThemePath } from "@common/asset/swagger-theme";
import * as fs from "fs";
import * as morgan from "morgan";

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
        const swaggerConfig = new DocumentBuilder()
            .setTitle("NestJS Boilerplate Swagger")
            .setDescription("Swagger for API in NestJS");
        const swaggerDocument = SwaggerModule.createDocument(
            app,
            swaggerConfig.build()
        );
        const swaggerPath = "docs";
        const swaggerTheme = fs
            .readFileSync(SwaggerThemePath.Newspaper) // You can change the theme of swagger page from here
            .toString();
        SwaggerModule.setup(swaggerPath, app, swaggerDocument, {
            explorer: true,
            customCss: swaggerTheme,
        });

        // Start
        const config = AppConfig();
        await app.listen(config.port, async () => {
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
bootstrap();
