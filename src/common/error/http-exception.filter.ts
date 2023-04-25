import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    InternalServerErrorException,
    HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";

interface HttpResponse {
    statusCode: string;
    message: string;
    error: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger("🚨 ExceptionFilter");

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const path = `${request.method} ${request.url}`;

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException(exception.message);
        }

        const httpException = exception as HttpException;
        const status = httpException.getStatus();
        const httpResponse = <HttpResponse>httpException.getResponse();

        if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.logger.error(
                path,
                httpResponse.message,
                JSON.stringify({
                    body: request.body,
                    token: request.headers?.authorization,
                    error: httpResponse.error,
                })
            );
        }

        response.status(status).json({
            ...httpResponse,
            timestamp: new Date().toISOString(),
            path,
        });
    }
}
