import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserRole } from "src/shared/enum/user-role.enum";
import { JwtAuthGuard } from "src/common/guard/jwt-auth.guard";
import { RolesGuard } from "src/common/guard/roles.guard";

/**
 * A bundle of decorators that verify user access.
 * @param roles - Roles of the user to allow access.
 */
export function JwtRolesAuth(...roles: UserRole[]) {
    if (roles.length) {
        return applyDecorators(
            Roles(...roles),
            UseGuards(JwtAuthGuard, RolesGuard),
            ApiBearerAuth()
        );
    }
    return applyDecorators();
}
