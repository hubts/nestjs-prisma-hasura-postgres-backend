import { CacheEntity } from "./cache.entity";
import { ConsoleLogEntity } from "./console-log.entity";
import { ErrorLogEntity } from "./error-log.entity";

export * from "./console-log.entity";
export * from "./error-log.entity";
export * from "./cache.entity";

export const CommonEntities = [ConsoleLogEntity, ErrorLogEntity, CacheEntity];
