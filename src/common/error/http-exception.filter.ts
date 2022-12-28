import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
    InternalServerErrorException,
} from "@nestjs/common";
import { Request, Response } from "express";

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const path = `${request.method} ${request.url}`;

        if (!(exception instanceof HttpException)) {
            exception = new InternalServerErrorException(exception.message);
        }

        const httpException = exception as HttpException;
        const httpResponse = httpException.getResponse();
        const status = httpException.getStatus();

        this.logger.error(JSON.stringify(httpException));
        response.status(status).json({
            response: httpResponse,
            timestamp: new Date().toISOString(),
            path,
        });
    }
}
