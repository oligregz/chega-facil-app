import { HttpException, HttpStatus } from '@nestjs/common';
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

export function handleError(error: any, response: Response) {
  if (error instanceof AppError) {
    console.error({
      status: error.statusCode,
      message: error.message,
    });

    throw new HttpException(
      { status: 'error', message: error.message },
      error.statusCode,
    );
  } else {
    console.error('Erro inesperado:', error);
    throw new HttpException(
      { status: 'error', message: 'Erro interno do servidor' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
