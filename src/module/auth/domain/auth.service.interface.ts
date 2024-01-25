import { UserEntity } from "src/entity";

export interface IAuthService {
    getRefreshTokenKey(refreshToken: string, email: string): string;
    issueAuthTokens(target: UserEntity): Promise<IIssueAuthTokensResult>;
}

export interface IIssueAuthTokensResult {
    accessToken: string;
    refreshToken: string;
}
