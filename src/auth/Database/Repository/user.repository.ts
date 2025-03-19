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

  findAllUsers(): Promise<User[]> {
    return this._userModel.find(
      { isBlocked: false },
      {
        fullName: 1,
      },
    );
  }

  findByFullName(
    userId: string,
    fullName: string,
    limit: number,
  ): Promise<User[]> {
    const query: any = {
      fullName: new RegExp(fullName, 'i'),
      _id: { $ne: userId },
    };

    return this._userModel
      .find(query, {
        fullName: 1,
        email: 1,
      })
      .limit(limit)
      .exec();
  }

  findUserWithId(userId: string) {
    return this._userModel.findById(userId, {
      isAdmin: 0,
      isBlocked: 0,
      password: 0,
      __v: 0,
    });
  }
}
