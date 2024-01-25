import { SwaggerThemePath } from "./theme";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";

export function setupSwagger(
    app: NestExpressApplication,
    swaggerPath: string,
    baseUrl: string
): void {
    const swaggerConfig = new DocumentBuilder()
        .addServer(baseUrl)
        .setTitle("Backend API Swagger")
        .setDescription("Documents to experience the Backend API")
        .addBearerAuth({
            type: "http",
            bearerFormat: "JWT",
        });
    const swaggerDocument = SwaggerModule.createDocument(
        app,
        swaggerConfig.build()
    );
    // NOTE: You can change the theme of swagger web-site in here
    const swaggerTheme = fs.readFileSync(SwaggerThemePath.Muted).toString();
    SwaggerModule.setup(swaggerPath, app, swaggerDocument, {
        explorer: true,
        customCss: swaggerTheme,
    });
}
