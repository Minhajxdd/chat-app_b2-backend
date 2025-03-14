import { Body, Controller, Inject, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { RegisterDto } from '../Dto/register.dto';
import { IAuthService } from '../Interface/Service/auth-service.interface';
import { LoginDto } from '../Dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AuthService')
    private readonly _authService: IAuthService,
  ) {}

  @Post('register')
  register(@Body() registerData: RegisterDto, @Res() res: Response) {
    return this._authService.register(registerData, res);
  }

  @Post('login')
  login(@Body() loginData: LoginDto, @Res() res: Response) {
    return this._authService.login(loginData, res);
  }

  @Post('refresh')
  refreshTokens(@Req() req: Request, @Res() res: Response) {
    return this._authService.refreshTokens(req, res);
  }

  @Post('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    return this._authService.logout(req, res);
  }
}
