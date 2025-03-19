import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../Database/Repository/user.repository';

@Injectable()
export class AuthProfileService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
  ) {}

  async getUsers() {
    const data = await this._userRepository.findAllUsers();

    return {
      status: 'success',
      message: 'successfully fetched',
      data,
    };
  }

  async getUser(userId: string) {
    const data = await this._userRepository.findUserWithId(userId);

    return {
      status: 'success',
      message: 'successfully fetched',
      data,
    };
  }
}
