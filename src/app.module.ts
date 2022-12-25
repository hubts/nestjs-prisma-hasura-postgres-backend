import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import {
    ThrottlerConfigService,
    TypeOrmConfigService,
    ValidationSchema,
    configurations,
} from "@config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: ValidationSchema,
            envFilePath: [".env"],
            load: [...configurations],
        }),
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmConfigService,
        }),
        ThrottlerModule.forRootAsync({
            useClass: ThrottlerConfigService,
        }),
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ThrottlerGuard,
        },
    ],
})
export class AppModule {}
