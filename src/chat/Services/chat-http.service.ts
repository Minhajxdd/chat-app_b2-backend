import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/Database/Repository/user.repository';

@Injectable()
export class ChatHttpService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
  ) {}

  async searchByFullName(name: string, limit?: string) {
    const limitCount = Number(limit) || 2;

    const data = await this._userRepository.findByFullName(name, limitCount);

    return {
      status: 'success',
      message: 'successfully fetched data',
      data,
    };
  }
}
