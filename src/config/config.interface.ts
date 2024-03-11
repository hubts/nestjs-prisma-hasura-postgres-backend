export interface IConfig {
    SERVER: IServerConfig;
    DB: IDatabaseConfig;
    JWT: IJwtConfig;
    THROTTLER: IThrottlerConfig;
}

export enum ServerEnv {
    LOCAL = "local",
    DEVELOPMENT = "development",
    TEST = "test",
    PRODUCTION = "production",
}

export interface IServerConfig {
    env: ServerEnv;
    port: number;
    externalEndpoint: string;
    isProduction: boolean;
}

export interface IDatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    dbname: string;
    sync: boolean;
    logging: boolean;
    schema: string;
}

export interface IJwtConfig {
    privateKey: string;
    publicKey: string;
    accessTokenExpiresIn: number;
    refreshTokenExpiresIn: number;
}

export interface IThrottlerConfig {
    ttl: number;
    limit: number;
}
