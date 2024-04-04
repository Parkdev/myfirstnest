import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  // nest js의 logger를 사용
  private logger = new Logger('HTTP'); // [Nest] 51337  - 04/04/2024, 4:16:58 PM     LOG [HTTP] ::1

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(`${req.ip},파파 ${req.originalUrl}`, req.originalUrl);
    res.on('finish', () => {
      this.logger.log(
        `${req.ip} ${req.method} ${res.statusCode}`,
        req.originalUrl,
      );
    });
    next();
  }
}
