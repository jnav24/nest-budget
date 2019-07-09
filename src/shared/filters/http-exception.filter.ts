import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        let message = 'Something unexpected has occurred';

        if (typeof exception.message.error !== 'undefined') {
            message = exception.message.error;
        }

        if (typeof exception.message === 'string') {
            message = exception.message;
        }

        Logger.error(`${message}`, request.url, 'ExceptionFilter');

        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message,
        });
    }
}
