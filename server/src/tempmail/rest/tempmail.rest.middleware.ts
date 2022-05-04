import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TempmailRestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const jwtService = new JwtService({ secret: process.env.JWT_SECRET_KEY });
    req.body.email = jwtService.decode(req.headers['mail-token'].toString(), {
      json: true,
    })?.['mail'][0];
    next();
  }
}
