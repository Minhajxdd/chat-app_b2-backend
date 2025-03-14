import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { User } from '../Schemea/user.schmea';
import { IUserRepository } from 'src/auth/Interface/Repository/user-repository.interface';

@Injectable()
export class UserRepository
  extends GenericRepository<User>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) private _userModel: Model<User>) {
    super(_userModel);
  }
}
