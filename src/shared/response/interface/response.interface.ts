import { ResponseCode, ResponseName } from "./response.type";

export interface IResponse<T> {
    success: boolean;
    code: ResponseCode;
    name: ResponseName;
    message: string;
    data: T | null;
}
