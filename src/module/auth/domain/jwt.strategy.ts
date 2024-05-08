import { PassportStrategy } from "@nestjs/passport";
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigType } from "@nestjs/config";
import { UserService } from "src/module/user/domain/user.service";
import { HasuraJwtPayload } from "src/shared/interface/hasura-jwt-payload.interface";
import { JwtConfig } from "src/config/validated/jwt.config";
import { IUser } from "src/shared/entity/user";

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
    constructor(
        @Inject(JwtConfig.KEY)
        jwtConfig: ConfigType<typeof JwtConfig>,
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.publicKey,
        });
    }

    async validate(payload: HasuraJwtPayload): Promise<IUser> {
        const id = payload.claims["x-hasura-user-id"];
        const role = payload.claims["x-hasura-role"];
        if (!id || !role) {
            throw new UnauthorizedException("Unauthorized JWT claims");
        }

        const userModel = await this.userService.getUserById(id);
        if (!userModel) {
            throw new UnauthorizedException("Unknown user ID");
        }
        return userModel;
    }
}
