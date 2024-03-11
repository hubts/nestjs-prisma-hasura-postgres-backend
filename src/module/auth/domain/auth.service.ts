import { Inject, Injectable } from "@nestjs/common";
import { IAuthService, IIssueAuthTokensResult } from "./auth.service.interface";
import { UserEntity } from "src/entity";
import { HasuraJwtPayload } from "src/shared/interface";
import { UserRole } from "src/shared/enum";
import { JwtService } from "@nestjs/jwt";
import { Random } from "src/shared/util";
import { CACHE_KEY, REFRESH_TOKEN_LENGTH } from "src/shared/constant";
import { CacheService } from "src/infrastructure";
import { JwtConfig } from "src/config/validated/jwt.config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthService implements IAuthService {
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
     * @param target - Target(actor) authenticated.
     * @returns A new access token and refresh token for target.
     */
    async issueAuthTokens(target: UserEntity): Promise<IIssueAuthTokensResult> {
        const payload: HasuraJwtPayload = {
            claims: {
                "x-hasura-allowed-roles": Object.values(UserRole) as UserRole[],
                "x-hasura-role": target.role,
                "x-hasura-default-role": target.role,
                "x-hasura-user-id": target.id,
                email: target.email,
                nickname: target.nickname,
            },
        };
        const accessToken = this.jwtService.sign(payload);

        const refreshToken = Random.hex(REFRESH_TOKEN_LENGTH);
        const refreshTokenKey = this.getRefreshTokenKey(
            refreshToken,
            target.email
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
