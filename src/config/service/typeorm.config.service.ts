import { Inject, Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ConfigType } from "@nestjs/config";
import { TypeOrmConfig } from "@config";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    private config: ConfigType<typeof TypeOrmConfig>;

    constructor(
        @Inject(TypeOrmConfig.KEY)
        config: ConfigType<typeof TypeOrmConfig>
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
