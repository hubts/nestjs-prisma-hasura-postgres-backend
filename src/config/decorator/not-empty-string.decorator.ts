import { applyDecorators } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export function NotEmptyString() {
    return applyDecorators(Expose(), IsNotEmpty(), IsString());
}
