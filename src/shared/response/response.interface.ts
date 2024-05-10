import { ResponseCode } from "./response.code";

export interface IResponse<T = undefined> {
    success: boolean;
    code: ResponseCode;
    name: string;
    message: string;
    data?: T;
}
