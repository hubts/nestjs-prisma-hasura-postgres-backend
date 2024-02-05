export interface IResponse<T = undefined> {
    success: boolean;
    code: number;
    name: string;
    message: string;
    data?: T;
}
