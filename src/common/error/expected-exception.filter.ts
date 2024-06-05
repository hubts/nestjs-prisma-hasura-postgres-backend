import { ExceptionFilter, Catch, ArgumentsHost } from "@nestjs/common";
import { Request, Response } from "express";
import { CustomLogger } from "../logger/custom.logger";
import { ExpectedFailureException } from "./exception/expected-failure.exception";
import { IResponse } from "src/shared/response/interface/response.interface";

@Catch(ExpectedFailureException)
export class ExpectedExceptionFilter
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
        const { message } = cause;

        // Error log saved, however, does not print by silent mode.
        this.logger.error(
            message,
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
            ...cause,
            extensions: {
                ip: request.ip,
                path,
                timestamp: new Date().toISOString(),
            },
        });
    }
}
