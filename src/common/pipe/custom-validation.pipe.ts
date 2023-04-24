import { Injectable, ArgumentMetadata, ValidationPipe, BadRequestException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
    constructor() {
        super();
    }

    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            skipNullProperties: false, // If property is null, would you let me in?
            skipMissingProperties: false, // If property is missed, would you let me in?
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        });
        if (errors.length > 0) {
            const records: object[] = [];
            const errorRecords = this.searchErrorConstraints(errors, records);
            throw new BadRequestException(`Payload validation failed: ${JSON.stringify(errorRecords)}`);
        }
        return value;
    }

    searchErrorConstraints(errors: ValidationError[], records: object[]): object[] {
        for (const error of errors) {
            if (error.constraints) {
                records.push(error.constraints);
            } else if (error.children) {
                this.searchErrorConstraints(error.children, records);
            }
        }
        return records;
    }

    toValidate(metatype: any): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find(type => metatype === type);
    }
}
