export interface IJoinUserInput {
    email: string;
    password: string;
    nickname: string;
}

// export interface IJoinUserOutputData {
//     accessToken: string;
//     refreshToken: string;
// }

// export type IJoinUserOutput = IResponse<IJoinUserOutputData>;

export interface IJoinUserOutput {
    accessToken: string;
    refreshToken: string;
}
