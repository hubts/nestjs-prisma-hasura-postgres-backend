import { CommonEntities } from "./common";
import { UserEntities } from "./user";

export * from "./audit.entity";
export * from "./user";

// All entities are spread to synchronize in database
export const entities = [...CommonEntities, ...UserEntities];
