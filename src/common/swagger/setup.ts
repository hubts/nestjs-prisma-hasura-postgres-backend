import { SwaggerThemePath } from "./theme";
import { NestExpressApplication } from "@nestjs/platform-express";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as fs from "fs";
import { SwaggerSetupOptions } from "./interface";

export function setupSwagger(
    app: NestExpressApplication,
    options: SwaggerSetupOptions
): void {
    const { path, serverUrl, localhostPort, title, description, version } =
        options;

    const swaggerConfig = new DocumentBuilder();
    if (serverUrl) {
        swaggerConfig.addServer(serverUrl);
    } else if (localhostPort) {
        swaggerConfig.addServer(`http://localhost:${localhostPort}`);
    }
    if (title) {
        swaggerConfig.setTitle(title);
    }
    if (description) {
        swaggerConfig.setDescription(description);
    }
    if (version) {
        swaggerConfig.setVersion(version);
    }

    // JWT
    swaggerConfig.addBearerAuth({
        type: "http",
        bearerFormat: "JWT",
    });
    const swaggerDocument = SwaggerModule.createDocument(
        app,
        swaggerConfig.build()
    );
    // NOTE: You can change the theme of swagger web-site in here
    const swaggerTheme = fs.readFileSync(SwaggerThemePath.Muted).toString();
    SwaggerModule.setup(path, app, swaggerDocument, {
        explorer: true,
        customCss: swaggerTheme,
    });
}
