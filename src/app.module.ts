import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_FILTER, APP_GUARD, APP_PIPE } from "@nestjs/core";

import { AppController } from "./module/app/app.controller";
import { CustomValidationPipe } from "./common/pipe/custom-validation.pipe";
import { HealthCheckModule } from "./module/health-check/health-check.module";
import { configurations } from "./config/configurations";
import { AppService } from "./module/app/app.service";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { HttpExceptionFilter } from "./common/error/filter/http-exception.filter";
import { CustomLoggerModule } from "./common/logger/custom-logger.module";
import { ThrottlerConfigService } from "./config/service/throttler.config.service";
import { CacheModule } from "./infrastructure/cache/cache.module";
import { PrismaModule } from "./infrastructure/prisma/prisma.module";
import { FailureExceptionFilter } from "./common/error/filter/failure-exception.filter";
import { CqrsModule } from "@nestjs/cqrs";

const DomainModules = [
    /**
     * Below: Implemented domain modules
     */
    UserModule,
    AuthModule,
];

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // ConfigModule can be globally used in any module
            expandVariables: true, // Supports environment variable expansion
            envFilePath: [".env"], // The environment file to be imported
            load: [...configurations], // Load configurations organized and separated into each config object
        }),
        ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }), // Throttler configuration imported
        CustomLoggerModule, // Custom logger module to use logger in 'main.ts'
        HealthCheckModule, // Health check module
        PrismaModule, // Prisma ORM module (global)
        CacheModule, // Cache module (global)
        CqrsModule.forRoot(),
        ...DomainModules,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // Globally used providers with 'APP_' prefix
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_PIPE, useClass: CustomValidationPipe },
        { provide: APP_FILTER, useClass: HttpExceptionFilter }, // Second filter
        { provide: APP_FILTER, useClass: FailureExceptionFilter }, // First filter
    ],
})
export class AppModule {}
