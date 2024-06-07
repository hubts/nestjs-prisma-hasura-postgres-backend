import { Role } from "@prisma/client";

export interface JwtPayload {
    id: string;
    role: Role;
    nickname: string;
}
