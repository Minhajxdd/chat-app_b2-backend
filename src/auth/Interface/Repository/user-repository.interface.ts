import { User } from '../../Database/Schemea/user.schmea';
import { IGenericRepository } from './generic-repository.interface';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IUserRepository extends IGenericRepository<User> {}
