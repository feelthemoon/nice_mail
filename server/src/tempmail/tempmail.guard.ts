import { Injectable, CanActivate, ExecutionContext, HttpException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TempmailGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
  private validateRequest(request) {
    const token = request.headers?.['mail-token'];
    try {
      this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET_KEY,
      });
      return true;
    } catch (e) {
      throw new HttpException(
        { error: 'Oops! Your email was expired:( Try to refresh page.' },
        401,
      );
    }
  }
}
