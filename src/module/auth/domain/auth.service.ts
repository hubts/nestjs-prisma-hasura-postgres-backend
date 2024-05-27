import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { JwtConfig } from "src/config/validated/jwt.config";
import { ConfigType } from "@nestjs/config";
import { REFRESH_TOKEN_LENGTH } from "src/shared/constant/auth.constant";
import { CACHE_KEY } from "src/shared/constant/cache.constant";
import { HasuraJwtPayload } from "src/shared/interface/hasura-jwt-payload.interface";
import { Random } from "src/shared/util/random";
import { CacheService } from "src/infrastructure/cache/cache.service";
import { Role, User } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(
        @Inject(JwtConfig.KEY)
        private readonly jwtConfig: ConfigType<typeof JwtConfig>,
        private readonly jwtService: JwtService,
        private readonly cacheService: CacheService
    ) {}

    /**
     * Get a refresh token key.
     * The key may not be unique according to random refresh token within the user.
     * @param refreshToken - A refresh token.
     * @param email - An email of user.
     * @returns Refresh token key to be set.
     */
    getRefreshTokenKey(refreshToken: string, email: string): string {
        return `${CACHE_KEY.REFRESH_TOKEN_PREFIX}:${refreshToken}:${email}`;
    }

    /**
     * Issue a new access token and refresh token.
     * @param userModel - Target(actor) user model authenticated.
     * @returns A new access token and refresh token for target.
     */
    async issueAuthTokens(
        userProps: Pick<User, "id" | "role" | "email" | "nickname">
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const payload: HasuraJwtPayload = {
            claims: {
                "x-hasura-allowed-roles": Object.values(Role) as Role[],
                "x-hasura-role": userProps.role,
                "x-hasura-default-role": userProps.role,
                "x-hasura-user-id": userProps.id,
                email: userProps.email,
                nickname: userProps.nickname,
            },
        };
        const accessToken = this.jwtService.sign(payload);

        const refreshToken = Random.hex(REFRESH_TOKEN_LENGTH);
        const refreshTokenKey = this.getRefreshTokenKey(
            refreshToken,
            userProps.email
        );

        await this.cacheService.set(
            refreshTokenKey,
            accessToken,
            this.jwtConfig.refreshTokenExpiresIn
        );

        return {
            accessToken,
            refreshToken,
        };
    }
}
