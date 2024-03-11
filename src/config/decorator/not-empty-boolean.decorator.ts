import { applyDecorators } from "@nestjs/common";
import { Expose, Transform } from "class-transformer";
import { IsBoolean, IsNotEmpty } from "class-validator";

export function NotEmptyBoolean(...trueStrings: string[]) {
    return applyDecorators(
        Expose(),
        IsNotEmpty(),
        Transform(({ obj, key }) => trueStrings.includes(obj[key])),
        IsBoolean()
    );
}
