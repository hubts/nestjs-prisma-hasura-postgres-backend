import { UseGuards, applyDecorators } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { JwtAuthGuard, RolesGuard } from "../guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { UserRole } from "src/shared/enum";

export function JwtRolesAuth(...roles: UserRole[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(JwtAuthGuard, RolesGuard),
        ApiBearerAuth()
    );
}
