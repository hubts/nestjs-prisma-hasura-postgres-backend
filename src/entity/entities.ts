import { CacheEntity } from "./common/cache.entity";
import { ConsoleLogEntity } from "./common/console-log.entity";
import { ErrorLogEntity } from "./common/error-log.entity";
import { UserProfileEntity } from "./user/user-profile.entity";
import { UserEntity } from "./user/user.entity";

// All entities are spread to synchronize in database
export const entities = [
    CacheEntity,
    ConsoleLogEntity,
    ErrorLogEntity,
    UserEntity,
    UserProfileEntity,
];
