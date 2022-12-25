import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import {
    TypeOrmConfigService,
    ValidationSchema,
    configurations,
} from "@config";
import { TypeOrmModule } from "@nestjs/typeorm";

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
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
