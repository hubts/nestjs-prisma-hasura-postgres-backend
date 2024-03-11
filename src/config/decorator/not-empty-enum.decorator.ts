import { applyDecorators } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsEnum, IsNotEmpty } from "class-validator";

export function NotEmptyEnum(enums: object) {
    return applyDecorators(Expose(), IsNotEmpty(), IsEnum(enums));
}
