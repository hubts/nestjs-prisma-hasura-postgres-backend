import { AppConfig } from "./app.config";
import { ValidationSchema } from "./env/validation.schema";
import { TypeOrmConfig } from "./typeorm.config";
import { TypeOrmConfigService } from "./service/typeorm.config.service";

export { ValidationSchema, AppConfig, TypeOrmConfig, TypeOrmConfigService };

export const configurations = [AppConfig, TypeOrmConfig];
