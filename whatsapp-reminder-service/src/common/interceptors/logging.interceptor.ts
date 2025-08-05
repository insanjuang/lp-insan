import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const { method, url, body, query, params } = request;
    const userAgent = request.get('User-Agent') || '';
    const startTime = Date.now();

    // Log incoming request
    this.logger.log(
      `Incoming Request: ${method} ${url} - ${userAgent}`,
    );

    // Log request details in debug mode
    if (process.env.NODE_ENV === 'development') {
      this.logger.debug(`Request Body: ${JSON.stringify(body)}`);
      this.logger.debug(`Request Query: ${JSON.stringify(query)}`);
      this.logger.debug(`Request Params: ${JSON.stringify(params)}`);
    }

    return next.handle().pipe(
      tap({
        next: (responseBody) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          this.logger.log(
            `Outgoing Response: ${method} ${url} - ${response.statusCode} - ${duration}ms`,
          );

          // Log response body in debug mode (be careful with sensitive data)
          if (process.env.NODE_ENV === 'development' && responseBody) {
            this.logger.debug(`Response Body: ${JSON.stringify(responseBody)}`);
          }
        },
        error: (error) => {
          const endTime = Date.now();
          const duration = endTime - startTime;
          
          this.logger.error(
            `Request Error: ${method} ${url} - ${error.status || 500} - ${duration}ms - ${error.message}`,
          );
        },
      }),
    );
  }
}