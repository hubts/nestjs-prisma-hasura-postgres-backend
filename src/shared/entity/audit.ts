/**
 * Audit model.
 * @property id - Primary generated UUID.
 * @property createdAt - Created date time.
 * @property updatedAt - Updated date time.
 * @property deletedAt - Deleted date time.
 */

export interface IAudit {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
}
