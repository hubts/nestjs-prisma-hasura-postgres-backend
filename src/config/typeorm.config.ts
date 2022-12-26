import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { entities } from "@shared/model";

export const TypeOrmConfig = registerAs(
    "typeorm",
    (): TypeOrmModuleOptions => ({
        type: (process.env.DB_TYPE as any) || "postgres",
        host: process.env.DB_HOST || "localhost",
        port: parseInt(process.env.DB_PORT || "5432"),
        username: process.env.DB_USERNAME || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "postgres",
        entities: [...entities],
        synchronize: process.env.DB_SYNC === "true",
        logging: process.env.DB_LOGGING === "true",
        schema: process.env.DB_SCHEMA || "public",
        autoLoadEntities: true,
    })
);
