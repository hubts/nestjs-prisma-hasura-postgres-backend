import { UserRole } from "../enum/user-role.enum";

export interface HasuraJwtPayload {
    claims: {
        "x-hasura-allowed-roles": UserRole[];
        "x-hasura-default-role": UserRole;
        "x-hasura-role": UserRole;
        "x-hasura-user-id": string;
        email: string;
        nickname: string;
    };
}
