import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { AppError } from './app-error';

@Catch()
export class AppErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Error caught:', exception);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof AppError) {
      return response.status(exception.statusCode).json({
        error_code: exception.error_code,
        error_description: exception.error_description,
      });
    }

    // If it is a validation error (BadRequestException)
    if (exception instanceof BadRequestException) {
      console.log('_____exception', exception);
      const error = exception.getResponse() as any;
      const [error_code_splited, error_description_splited] =
        splitErrorMessages(error);

      // If it is a class-validator validation error
      if (Array.isArray(error.message)) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          error_code: error_code_splited,
          error_description: error_description_splited,
        });
      }

      return response.status(HttpStatus.BAD_REQUEST).json({
        error_code: error_code_splited,
        error_description: error_description_splited,
      });
    }

    // If it is NestJS default HttpException
    if (exception instanceof HttpException) {
      return response.status(exception.getStatus()).json({
        error_code: 'INTERNAL_ERROR',
        error_description: exception.message,
      });
    }

    // For other unhandled error types
    console.error('Unhandled error:', exception);
    return response.status(500).json({
      error_code: 'INTERNAL_SERVER_ERROR',
      error_description: 'Ocorreu um erro interno no servidor',
    });
  }
}

export function splitErrorMessages(error: NonNullable<any>): string[] {
  // Treatment for body syntax errors
  if (!error.message[0].includes(']|[')) return ['INVALID_DATA', error.message];

  // Tratament for custom error handling
  const messages = error.message[0].split(']|[');
  return messages;
}
