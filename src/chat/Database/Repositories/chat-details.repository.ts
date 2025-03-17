import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/Database/Repository/user.repository';
import { IUserRepository } from 'src/auth/Interface/Repository/user-repository.interface';

@Injectable()
export class ChatDetailsRepository {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
  ) {}
}
