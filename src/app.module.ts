import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";

import { AppController } from "./module/app/app.controller";
import { CustomValidationPipe } from "./common/pipe/custom-validation.pipe";
import { HealthCheckModule } from "./module/health-check/health-check.module";
import { configurations } from "./config/configurations";
import { AppService } from "./module/app/app.service";
import { UserModule } from "./module/user/user.module";
import { AuthModule } from "./module/auth/auth.module";
import { DataSource, DataSourceOptions } from "typeorm";
import { addTransactionalDataSource } from "typeorm-transactional";
import { HttpExceptionFilter } from "./common/error/http-exception.filter";
import { CustomLoggerModule } from "./common/logger/custom-logger.module";
import { DatabaseConfigService } from "./config/service/database.config.service";
import { ThrottlerConfigService } from "./config/service/throttler.config.service";
import { entities } from "./entity/entities";
import { CacheModule } from "./infrastructure/cache/cache.module";

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
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
            async dataSourceFactory(options?: DataSourceOptions) {
                if (!options) {
                    throw new Error("Invalid typeorm options");
                }
                return addTransactionalDataSource(new DataSource(options));
            },
        }), // Database configuration imported
        TypeOrmModule.forFeature([...entities]), // All entities are imported to synchronize in database (This helps create a repository of entities)
        ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }), // Throttler configuration imported
        CustomLoggerModule, // Custom logger module to use logger in 'main.ts'
        HealthCheckModule, // Health check module
        CacheModule, // Cache module (global)
        ...DomainModules,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        // Globally used providers with 'APP_' prefix
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_PIPE, useClass: CustomValidationPipe },
        // { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
    ],
})
export class AppModule {}
