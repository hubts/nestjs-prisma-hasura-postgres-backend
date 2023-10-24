import {
    CacheModule,
    ClassSerializerInterceptor,
    Module,
} from "@nestjs/common";
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

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [".env"],
            load: [...configurations],
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService,
        }),
        TypeOrmModule.forFeature([...entities]),
        ThrottlerModule.forRootAsync({
            useClass: ThrottlerConfigService,
        }),
        CustomLoggerModule,
        CacheModule.register(),
        HealthCheckModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
        {
            provide: APP_PIPE,
            useClass: CustomValidationPipe,
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ClassSerializerInterceptor,
        },
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule {}
