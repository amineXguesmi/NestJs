/* eslint-disable prettier/prettier */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddlewareMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authUser = req.headers['auth-user'];
    if (typeof authUser != 'string') {
      return next(new UnauthorizedException('Unauth error1'));
    }
    verify(authUser, 'pass', (erreur, decoded) => {
      if (erreur || !decoded || typeof decoded != 'object' || !decoded.userId) {
        return next(new UnauthorizedException('Unauth error'));
      }
      req['userId'] = decoded.userId;
      next();
    });
  }
}