import { IAudit } from "src/shared/entity";
import { Random } from "src/shared/util";

export class AuditModel implements IAudit {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

    constructor() {
        this.id = Random.uuid();
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.deletedAt = null;
    }

    static fromEntity<T>(entity: T) {
        return Object.assign(this, entity);
    }
}
