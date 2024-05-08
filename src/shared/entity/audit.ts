/**
 * Audit model.
 * @property id - Primary generated UUID.
 * @property createdAt - Created date time.
 * @property updatedAt - Updated date time.
 * @property deletedAt - Deleted date time.
 */

import { Random } from "../util/random";

export interface IAudit {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}

export const createAudit = (): IAudit => {
    return {
        id: Random.uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
    };
};
