import { RESPONSE_CODE } from "../constants/response.code";
import { FAILURE_MESSAGE } from "../constants/failure-message";
import { IResponse } from "../interface/response.interface";
import { FailureCode, FailureName } from "../interface/response.type";

export const asFailureResponse = (name: FailureName): IResponse<null> => {
    const code = Number(
        Object.entries(RESPONSE_CODE).find(([, val]) => val === name)?.[0] ?? 0
    ) as FailureCode;
    const message = FAILURE_MESSAGE[name];
    return {
        success: false,
        code,
        name: (name as string)
            .replaceAll("_", " ")
            .toLowerCase() as FailureName,
        message,
        data: null,
    };
};
