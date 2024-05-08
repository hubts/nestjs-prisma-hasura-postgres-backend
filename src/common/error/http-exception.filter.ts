import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { CustomLogger } from "../logger/custom.logger";

/**
 * HttpExceptionFilter filters error (or exception) from codes.
 * All of errors or exceptions are finally handled by this filter.
 *
 * When an exception threw by an expected error, that would be delivered and processed by Hasura.
 * In other hand, if an unexpected error occurs, that would be processed by 'Internal Server Error' (statusCode: 500).
 *
 * Note that Hasura expects 2xx or 4xx status code, so other status codes (such as 5xx) are regarded as an internal error automatically.
 * If you want to handle errors with an intended message, you should use a code as 2xx or 4xx.
 */

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private logger: CustomLogger) {}

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const path = `${request.method} ${request.url}`;

        // Unexpected error as InternalServerErrorException
        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException(exception.message);
        }

        const httpException = exception as HttpException;
        const httpResponse = <
            {
                statusCode: number;
                message: string;
                error: string;
            }
        >httpException.getResponse();
        const { statusCode, message, error } = httpResponse;
        const cause = httpException.cause;

        /**
         * Save error log.
         */
        if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
            // 500 error must be logged and saved.
            this.logger.error(
                message,
                JSON.stringify({
                    token: request.headers?.authorization,
                    body: request.body,
                    statusCode,
                    error,
                    cause,
                }),
                path
            );
        } else {
            // Error log saved, however, does not print by silent mode.
            this.logger.error(
                message,
                JSON.stringify({
                    token: request.headers?.authorization,
                    body: request.body,
                    statusCode,
                    error,
                    cause,
                }),
                path,
                true
            );
        }

        // Return
        response.status(statusCode).json({
            statusCode,
            message,
            extensions: {
                error,
                cause,
                timestamp: new Date().toISOString(),
                path,
            },
        });
    }
}
