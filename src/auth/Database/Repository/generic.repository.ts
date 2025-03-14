import { InternalServerErrorException } from '@nestjs/common';
import { Document, FilterQuery, Model } from 'mongoose';
import { IGenericRepository } from '../../Interface/Repository/generic-repository.interface';

export abstract class GenericRepository<T extends Document>
  implements IGenericRepository<T>
{
  constructor(protected readonly model: Model<T>) {}

  async create(item: Partial<T>): Promise<T> {
    try {
      return this.model.create(item);
    } catch (err) {
      console.log(`Error while creating : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findById(id: string): Promise<T> {
    try {
      return this.model.findById(id);
    } catch (err) {
      console.log(`Error while findingById a : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async findOne(item: FilterQuery<T>): Promise<T> {
    try {
      return this.model.findOne(item);
    } catch (err) {
      console.log(`Error while finding a : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async delete(item: FilterQuery<T>): Promise<boolean> {
    try {
      await this.model.deleteOne(item);

      return true;
    } catch (err) {
      console.log(`Error while deleting : ${err}`);
      throw new InternalServerErrorException();
    }
  }

  async update(filter: FilterQuery<T>, item: Partial<T>): Promise<boolean> {
    try {
      await this.model.updateOne(
        {
          filter,
        },
        {
          $set: {
            item,
          },
        },
        { new: true },
      );

      return true;
    } catch (err) {
      console.log(`Error whiel updating : ${err}`);
      throw new InternalServerErrorException();
    }
  }
}
