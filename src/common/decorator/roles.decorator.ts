import { SetMetadata } from "@nestjs/common";

/**
 * Decorator sets permissions related to access.
 * @param roles - Roles to allow to access.
 */
export const Roles = (...roles: string[]) => SetMetadata("roles", roles);
