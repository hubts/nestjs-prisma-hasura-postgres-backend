import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomLogger } from "../../logger/custom.logger";
import { ExpectedFailureException } from "../exception/expected-failure.exception";
import { IResponse } from "src/shared/response/interface/response.interface";

@Catch(ExpectedFailureException)
export class FailureExceptionFilter
    implements ExceptionFilter<ExpectedFailureException>
{
    constructor(private logger: CustomLogger) {}

    catch(exception: ExpectedFailureException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const path = `${request.method} ${request.url}`;

        const status = exception.getStatus();
        const cause = <IResponse<null>>exception.cause;

        // Error log saved, however, does not print by silent mode.
        this.logger.error(
            cause.message,
            JSON.stringify({
                statusCode: status,
                token: request.headers?.authorization,
                body: request.body,
                cause,
            }),
            path,
            true
        );

        // Return
        response.status(status).json({
            success: cause.success,
            message: cause.message,
            code: cause.code,
            name: cause.name,
            data: cause.data,
            extensions: {
                cause,
                ip: request.ip,
                path,
                timestamp: new Date().toISOString(),
            },
        });
    }
}
