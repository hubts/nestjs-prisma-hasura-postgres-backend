import { Inject, Injectable } from "@nestjs/common";
import { HasuraJwtPayload } from "src/shared/interface";
import { UserRole } from "src/shared/enum";
import { JwtService } from "@nestjs/jwt";
import { Random } from "src/shared/util";
import { CACHE_KEY, REFRESH_TOKEN_LENGTH } from "src/shared/constant";
import { CacheService } from "src/infrastructure/cache";
import { JwtConfig } from "src/config/validated/jwt.config";
import { ConfigType } from "@nestjs/config";
import { UserModel } from "src/module/user/domain/model/user.model";

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
        userModel: Pick<UserModel, "id" | "role" | "email" | "nickname">
    ): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const payload: HasuraJwtPayload = {
            claims: {
                "x-hasura-allowed-roles": Object.values(UserRole) as UserRole[],
                "x-hasura-role": userModel.role,
                "x-hasura-default-role": userModel.role,
                "x-hasura-user-id": userModel.id,
                email: userModel.email,
                nickname: userModel.nickname,
            },
        };
        const accessToken = this.jwtService.sign(payload);

        const refreshToken = Random.hex(REFRESH_TOKEN_LENGTH);
        const refreshTokenKey = this.getRefreshTokenKey(
            refreshToken,
            userModel.email
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
