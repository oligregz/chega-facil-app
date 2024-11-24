import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url } = req;
    res.on('finish', () => {
      const statusCode = res.statusCode;

      this.logger.log(`${method} ${url} ${statusCode}`);
    });
    const statusCode = res.statusCode;

    next();
  }
}
