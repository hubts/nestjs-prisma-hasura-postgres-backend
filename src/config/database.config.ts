import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import {
    IsNotEmpty,
    IsString,
    IsInt,
    Min,
    Max,
    IsBoolean,
    IsOptional,
} from "class-validator";
import { validateConfig } from "./util/validate-config";
import { entities } from "src/entity";

export const DatabaseConfig = registerAs(
    "database",
    (): TypeOrmModuleOptions => {
        validateConfig(process.env, DatabaseConfigValidation);

        return {
            type: "postgres",
            host: process.env.DB_HOST as string,
            port: parseInt(process.env.DB_PORT || "5432"),
            username: process.env.DB_USERNAME || "postgres",
            password: process.env.DB_PASSWORD || "password",
            database: process.env.DB_NAME || "postgres",
            synchronize: process.env.DB_SYNC === "true",
            logging: process.env.DB_LOGGING === "true",
            schema: process.env.DB_SCHEMA || "public",
            dropSchema: false, // If true, the schema is always initialized at the start of the application
            uuidExtension: "uuid-ossp",
            autoLoadEntities: true,
            entities: [...entities],
        };
    }
);

class DatabaseConfigValidation {
    @IsNotEmpty()
    @IsString()
    DB_HOST!: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(65535)
    DB_PORT!: number;

    @IsNotEmpty()
    @IsString()
    DB_USERNAME!: string;

    @IsNotEmpty()
    @IsString()
    DB_PASSWORD!: string;

    @IsNotEmpty()
    @IsString()
    DB_NAME!: string;

    @IsNotEmpty()
    @IsBoolean()
    DB_SYNC!: boolean;

    @IsOptional()
    @IsBoolean()
    DB_LOGGING?: boolean;

    @IsNotEmpty()
    @IsString()
    DB_SCHEMA!: string;
}
