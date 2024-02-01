import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { Logger } from "@nestjs/common";

import { AppModule } from "./app.module";

import { json } from "body-parser";
import helmet from "helmet";
import compression from "compression";
import morgan from "morgan";
import { ServerConfig } from "./config";
import { setupSwagger } from "./common/swagger";
import { CustomLogger } from "./common/logger";
import { HealthCheckController } from "./module/health-check/health-check.controller";

async function run() {
    const logger = new Logger("Main");

    try {
        // Application and configuration
        const app = await NestFactory.create<NestExpressApplication>(
            AppModule,
            {
                bufferLogs: true,
                abortOnError: true,
            }
        );
        const serverConfig = ServerConfig();
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const packageJson = require("../package.json");

        // Custom logger (with database saving)
        app.useLogger(app.get(CustomLogger));

        // Payload limit
        app.use(json({ limit: "256kb" }));

        // CORS
        app.enableCors({
            allowedHeaders: ["Content-Type", "Authorization"],
            methods: "GET, POST",
            credentials: true,
            origin: "*",
        });

        // Swagger
        const swaggerPath = "docs";
        setupSwagger(app, {
            path: swaggerPath,
            serverUrl: serverConfig.externalEndpoint,
            // localhostPort: serverConfig.port,
            title: packageJson.name,
            version: packageJson.version,
            description: "Documents to experience API.",
        });

        // Secure HTTP header and compression
        app.use(helmet());
        app.use(compression());

        // Logging middleware (optional)
        app.use(morgan(serverConfig.isProduction ? "combined" : "dev"));

        // API prefix and versioning (optional)
        // app.setGlobalPrefix("api");
        // app.enableVersioning({
        //     type: VersioningType.URI,
        // });

        /**
         * Start
         */
        const healthCheckController = app.get(HealthCheckController);
        const status = await healthCheckController.getStatus();
        await app.listen(serverConfig.port, async () => {
            let log = `Application [ ${packageJson.name}:${packageJson.version} ] is successfully started\n`;
            log += `< Information >\n`;
            log += `Env                 : ${serverConfig.environment}\n`;
            log += `Application URL     : ${await app.getUrl()}\n`;
            log += `External endpoint   : ${serverConfig.externalEndpoint}\n`;
            log += `Swagger document    : ${serverConfig.externalEndpoint}/${swaggerPath}\n`;
            log += `Healthy (overview)  : ${status.overview ? "✅" : "🚫"}\n`;
            log += `Healthy (details)   : ${Object.keys(status.details)
                .map(key => `${key} ( ${status.details[key] ? "✅" : "🚫"} )`)
                .join(", ")}`;

            logger.verbose(log);
        });
    } catch (error) {
        logger.error(`Failed to start the application: ${error}`);
        process.exit(1);
    }
}
run();
