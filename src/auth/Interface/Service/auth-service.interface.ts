import { Response, Request } from 'express';
import { RegisterDto } from '../../Dto/register.dto';
import { LoginDto } from 'src/auth/Dto/login.dto';

export interface IAuthService {
  register(registerData: RegisterDto, res: Response): Promise<void>;

  login(loginData: LoginDto, res: Response): Promise<void>;

  refreshTokens(req: Request, res: Response): Promise<void>;

  logout(req: Request, res: Response): Promise<void>;
}
