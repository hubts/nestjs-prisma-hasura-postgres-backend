import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { SwaggerThemePath } from "./theme";

export default function setupSwagger(app: NestExpressApplication, path: string): void {
    const swaggerConfig = new DocumentBuilder()
        .setTitle("NestJS Boilerplate Swagger")
        .setDescription("Swagger for API in NestJS");
    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig.build());
    // You can change the theme of swagger page from here
    const swaggerTheme = fs.readFileSync(SwaggerThemePath.Newspaper).toString();
    SwaggerModule.setup(path, app, swaggerDocument, {
        explorer: true,
        customCss: swaggerTheme,
    });
}
