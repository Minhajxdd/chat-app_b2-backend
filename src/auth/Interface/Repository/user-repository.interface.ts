import { User } from '../../Database/Schemea/user.schmea';
import { IGenericRepository } from './generic-repository.interface';

export interface IUserRepository extends IGenericRepository<User> {
    findAllUsers(): Promise<User[]>;
}
