import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { Message } from '../Schemas/message.schema';

@Injectable()
export class MessageRepository extends GenericRepository<Message> {
  constructor(
    @InjectModel(Message.name)
    private _messageModel: Model<Message>,
  ) {
    super(_messageModel);
  }
}
