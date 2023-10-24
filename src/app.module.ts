import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from "@nestjs/core";

import { AppController } from "./module/app/app.controller";
import { CustomValidationPipe } from "./common/pipe/custom-validation.pipe";
import { HealthCheckModule } from "./module/health-check/health-check.module";
import {
    DatabaseConfigService,
    ThrottlerConfigService,
    configurations,
} from "./config";
import { entities } from "./entity";
import { HttpExceptionFilter } from "./common/error";
import { CustomLoggerModule } from "./common/logger";
import { AppService } from "./module/app/app.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // ConfigModule can be globally used in any module
            envFilePath: [".env"], // The environment file to be imported
            load: [...configurations], // Load configurations organized and separated into each config object
        }),
        TypeOrmModule.forRootAsync({ useClass: DatabaseConfigService }),
        TypeOrmModule.forFeature([...entities]),
        ThrottlerModule.forRootAsync({ useClass: ThrottlerConfigService }),
        CustomLoggerModule,
        HealthCheckModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        { provide: APP_GUARD, useClass: ThrottlerGuard },
        { provide: APP_PIPE, useClass: CustomValidationPipe },
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_FILTER, useClass: HttpExceptionFilter },
    ],
})
export class AppModule {}
