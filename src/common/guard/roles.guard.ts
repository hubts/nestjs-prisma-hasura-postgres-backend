import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserRole } from "src/shared/enum/user-role.enum";

/**
 * RolesGuard detects the role of outside actor.
 *
 * After JwtAuthGuard, the identifier and role of the actor was extracted.
 * RolesGuard challenges the role has an appropriate permission to execute or access to controller.
 */

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<UserRole[]>(
            "roles",
            context.getHandler()
        );
        if (!roles.length) {
            return true;
        }

        /**
         * Inherited roles
         */

        /**
         * Process
         */
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if (!user) {
            throw new UnauthorizedException("Unauthorized user access");
        }

        return roles.some(role => role === user.role);
    }
}
