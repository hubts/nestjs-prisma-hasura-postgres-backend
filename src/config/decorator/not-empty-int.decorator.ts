import { applyDecorators } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsInt, IsNotEmpty, Max, Min } from "class-validator";

export function NotEmptyInt() {
    return applyDecorators(Expose(), IsNotEmpty(), IsInt());
}

export function NotEmptyIntFrom(min: number) {
    return applyDecorators(Expose(), IsNotEmpty(), IsInt(), Min(min));
}

export function NotEmptyIntRange(min: number, max: number) {
    return applyDecorators(Expose(), IsNotEmpty(), IsInt(), Min(min), Max(max));
}
