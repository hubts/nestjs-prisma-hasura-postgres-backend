import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
    IsNotEmpty,
    IsString,
    IsInt,
    Min,
    Max,
    IsBoolean,
} from "class-validator";
import { Expose, Transform } from "class-transformer";
import { entities } from "src/entity";
import { ConfigValidation } from "src/common/decorator";

export const DatabaseConfig = registerAs(
    "database",
    (): TypeOrmModuleOptions => {
        const config = new DatabaseConfigValidation();

        return {
            type: "postgres",
            host: config.DB_HOST,
            port: config.DB_PORT,
            username: config.DB_USERNAME,
            password: config.DB_PASSWORD,
            database: config.DB_NAME,
            synchronize: config.DB_SYNC,
            logging: config.DB_LOGGING,
            schema: config.DB_SCHEMA,
            uuidExtension: "uuid-ossp",
            autoLoadEntities: true,
            dropSchema: false, // If true, the schema is always initialized at the start of the application
            entities: [...entities], // All entities you create must be spread here.
        };
    }
);

@ConfigValidation
class DatabaseConfigValidation {
    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_HOST: string;

    @Expose()
    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(65535)
    DB_PORT: number;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_USERNAME: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_PASSWORD: string;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_NAME: string;

    @Expose()
    @IsNotEmpty()
    @Transform(({ obj, key }) => obj[key] === "true")
    @IsBoolean()
    DB_SYNC: boolean;

    @Expose()
    @IsNotEmpty()
    @Transform(({ obj, key }) => obj[key] === "true")
    @IsBoolean()
    DB_LOGGING: boolean;

    @Expose()
    @IsNotEmpty()
    @IsString()
    DB_SCHEMA: string;
}
