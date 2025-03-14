import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';
import { IUserRepository } from '../Interface/Repository/user-repository.interface';
import { IRefreshTokenRepository } from '../Interface/Repository/refresh-token-repository.interface';
import { ITokenUtils } from '../Interface/Utils/token-utils.repository';

@Injectable()
export class TokenUtils implements ITokenUtils {
  constructor(
    private jwtService: JwtService,
    @Inject('RefreshTokenRepository')
    private readonly _refreshTokenRepository: IRefreshTokenRepository,
    @Inject('UserRepository')
    private readonly _userRepository: IUserRepository,
  ) {}

  async GenerateTokens(userId: string): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const user = await this._userRepository.findById(userId);

    const payload = {
      userId,
      isAdmin: user.isAdmin,
    };

    const accessToken = this.jwtService.sign(payload, { expiresIn: '30m' });

    const refreshToken = uuidv4();

    await this._refreshTokenRepository.updateOneUpsert(refreshToken, userId);

    return {
      accessToken,
      refreshToken,
    };
  }
}
