import { FilterQuery } from 'mongoose';

export interface IGenericRepository<T> {
  create(item: Partial<T>): Promise<T>;
  findById(id: string): Promise<T>;
  findOne(item: FilterQuery<T>): Promise<T>;
  delete(item: FilterQuery<T>): Promise<boolean>;
  update(filter: FilterQuery<T>, item: Partial<T>): Promise<boolean>;
}
