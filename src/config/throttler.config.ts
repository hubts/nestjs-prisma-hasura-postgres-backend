import { registerAs } from "@nestjs/config";
import { ThrottlerModuleOptions } from "@nestjs/throttler";
import { IsInt, Min, IsNotEmpty } from "class-validator";
import { validateConfig } from "./util/validate-config";

export const ThrottlerConfig = registerAs(
    "throttler",
    (): ThrottlerModuleOptions => {
        validateConfig(process.env, ThrottlerConfigValidation);

        return {
            ttl: parseInt(process.env.THROTTLER_TTL || "60"),
            limit: parseInt(process.env.THROTTLER_LIMIT || "1000"),
        };
    }
);

class ThrottlerConfigValidation {
    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_TTL?: number;

    @IsNotEmpty()
    @IsInt()
    @Min(1)
    THROTTLER_LIMIT?: number;
}
