import { FailureCode } from "./failure-code";

export const SuccessCode = 1000;
export interface IResponse<T = undefined> {
    success: boolean;
    code: typeof SuccessCode | FailureCode;
    name: string;
    message: string;
    data?: T;
}
