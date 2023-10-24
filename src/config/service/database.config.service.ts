import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";
import { DatabaseConfig } from "../database.config";

@Injectable()
export class DatabaseConfigService implements TypeOrmOptionsFactory {
    private config: ConfigType<typeof DatabaseConfig>;

    constructor(
        @Inject(DatabaseConfig.KEY)
        config: ConfigType<typeof DatabaseConfig>
    ) {
        this.config = config;
    }

    createTypeOrmOptions():
        | TypeOrmModuleOptions
        | Promise<TypeOrmModuleOptions> {
        return {
            ...this.config,
        };
    }
}
