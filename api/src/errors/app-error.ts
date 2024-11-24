import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { error } from 'console';
import { Response } from 'express';

export class AppError extends Error {
  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

@Catch(AppError) // Catch errors from the AppError class
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.statusCode;

    console.log({
      status: status,
      message: exception.message,
    });

    response.status(status).json({
      status: 'error',
      message: exception.message,
    });
  }
}
