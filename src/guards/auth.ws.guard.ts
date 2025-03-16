import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Observable } from 'rxjs';
  
  import { WsException } from '@nestjs/websockets';
  
  @Injectable()
  export class AuthWsGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request = context.switchToWs().getClient();
      const cookies = request.handshake.headers.cookie;
      const accessTokenRegex = /access_token=([^;]+)/;
  
      try {
        const token = cookies.match(accessTokenRegex)?.[1] || null;
  
        if (!token) {
          throw new WsException('Invalid Token');
        }
  
        const payload = this.jwtService.verify(token);
  
        request['user'] = payload;
      } catch (e) {
        Logger.error(`Invalid Token`);
        throw new WsException('Invalid Token');
      }
      return true;
    }
  }
  