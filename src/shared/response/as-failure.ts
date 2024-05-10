import { FailureCode, FailureName, RESPONSE_CODE } from "./response.code";
import { FAILURE_MESSAGE } from "./failure-message";
import { IResponse } from "./response.interface";

export const asFailure = (
    name: FailureName
): Pick<IResponse, "code" | "name" | "message"> => {
    const code = Number(
        Object.entries(RESPONSE_CODE).find(([, val]) => val === name)?.[0] ?? 0
    ) as FailureCode;
    const message = FAILURE_MESSAGE[name];
    return {
        code,
        name: name.replaceAll("_", " ").toLowerCase(),
        message,
    };
};
