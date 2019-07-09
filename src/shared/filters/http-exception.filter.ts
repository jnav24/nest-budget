import {ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger} from '@nestjs/common';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();

        Logger.error(`${exception.message.error || 'Something unexpected has occurred'}`, request.url, 'ExceptionFilter');

        response.status(status).json({
            status,
            timestamp: new Date().toISOString(),
            path: request.url,
            method: request.method,
            message: exception.message.error || 'Something unexpected has occurred',
        });
    }
}
