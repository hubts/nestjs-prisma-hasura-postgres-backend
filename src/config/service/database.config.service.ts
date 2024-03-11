import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";

import { DatabaseConfig } from "../validated/database.config";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    private config: ConfigType<typeof DatabaseConfig>;

    constructor(
        @Inject(DatabaseConfig.KEY)
        config: ConfigType<typeof DatabaseConfig>
    ) {
        this.config = config;
    }

    /**
     * TypeORM module options
     * - dropSchema: if true, the database schema is always dropped(initialized) at the start of the application
     */
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            uuidExtension: "uuid-ossp",
            dropSchema: false,
            autoLoadEntities: true,
            host: this.config.host,
            port: this.config.port,
            username: this.config.username,
            password: this.config.password,
            database: this.config.dbname,
            synchronize: this.config.sync,
            logging: this.config.logging,
            schema: this.config.schema,
        };
    }
}
