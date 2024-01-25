export interface IResponse<T = any> {
    success: boolean;
    code: number;
    message: string;
    data?: T;
}
