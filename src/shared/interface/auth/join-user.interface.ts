export interface IJoinUserInput {
    email: string;
    password: string;
    nickname: string;
}

export interface IJoinUserOutput {
    accessToken: string;
    refreshToken: string;
}
