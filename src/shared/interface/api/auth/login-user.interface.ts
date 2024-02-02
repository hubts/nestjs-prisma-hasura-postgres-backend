export interface ILoginUserInput {
    email: string;
    password: string;
}

export interface ILoginUserOutput {
    accessToken: string;
    refreshToken: string;
}
