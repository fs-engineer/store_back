import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';
// TODO need to removed prometheus logs from global logging
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger(LoggingInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler) {
        if (context.getType() === 'http') {
            return this.logHttpCall(context, next);
        } else {
            return next.handle();
        }
    }

    private logHttpCall(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const userAgent = request.get('user-agent') || '';
        const { ip, method, path: url } = request;
        const correlationKey = uuidv4();
        const userId = request.user?.userId;

        this.logger.log(
            `[${correlationKey}] ${method} ${url} ${userId} ${userAgent} ${ip}: ${
                context.getClass().name
            } ${context.getHandler().name}`,
        );

        const now = Date.now();
        return next.handle().pipe(
            tap(() => {
                const response = context.switchToHttp().getResponse();

                const { statusCode } = response;
                const contentLength = response.get('content-length');

                this.logger.log(
                    `[${correlationKey}] ${method} ${url} ${statusCode} ${contentLength}: ${Date.now() - now}ms`,
                );
            }),
        );
    }
}
