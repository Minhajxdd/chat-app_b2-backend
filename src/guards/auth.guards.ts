import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToHttp().getRequest();

      console.log(request)

      if(!request || !request.cookies) {
        throw new UnauthorizedException('Invalid Token');
      }

      const token = request.cookies['access_token'];
  
      if (!token) {
        throw new UnauthorizedException('Invalid Token');
      }
  
      try {
        const payload = this.jwtService.verify(token);
        request['user'] = payload;
      } catch (e) {
        Logger.error(e.message);
        throw new UnauthorizedException('Invalid Token');
      }
      return true;
    }
  }
  