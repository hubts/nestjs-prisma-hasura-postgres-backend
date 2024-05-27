import { Role } from "@prisma/client";

export interface HasuraJwtPayload {
    claims: {
        "x-hasura-allowed-roles": Role[];
        "x-hasura-default-role": Role;
        "x-hasura-role": Role;
        "x-hasura-user-id": string;
        email: string;
        nickname: string;
    };
}
