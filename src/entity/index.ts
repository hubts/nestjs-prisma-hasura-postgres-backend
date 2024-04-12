import { CommonEntities } from "./common";
import { UserEntities } from "./user";

export * from "./user";
export * from "./common";

// All entities are spread to synchronize in database
export const entities = [...CommonEntities, ...UserEntities];
