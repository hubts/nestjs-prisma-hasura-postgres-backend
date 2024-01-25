import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/config";
import { UserService } from "src/module/user/domain";
import { HasuraJwtPayload } from "src/shared/interface";
import { UserEntity } from "src/entity";

/**
 * Define a validation strategy for 'JwtAuthGuard'.
 *
 * As defined at constructor, JWT is extracted from 'Request'.
 * The token is confirmed by secret(public key), and transformed as payload.
 * Then, the valid user would be found, and returned.
 *
 * @param {HasuraJwtPayload} payload - The payload relayed from Hasura server (extracted by).
 * @return {User} The valid user (return is saved at 'user' field of 'Request' as 'request.user').
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: JwtConfig().publicKey,
        });
    }

    async validate(payload: HasuraJwtPayload): Promise<UserEntity> {
        const id = payload.claims["x-hasura-user-id"];
        const role = payload.claims["x-hasura-role"];
        if (!id || !role) {
            throw new UnauthorizedException("Unauthorized JWT claims");
        }

        const user = await this.userService.userRepo.findOneBy({
            id,
        });
        if (!user) {
            throw new UnauthorizedException("Unknown user ID");
        }

        return user;
    }
}
