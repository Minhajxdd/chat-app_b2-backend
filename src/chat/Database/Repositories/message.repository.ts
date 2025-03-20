import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
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

  getConversationsMessage1(
    conversationId: string,
    skip: number,
    limit: number,
  ) {
    
    return this._messageModel.aggregate([
      {
        $match: {
          conversation: new mongoose.Types.ObjectId(conversationId),
        },
      },
      {
        $sort: {
          createdAt: 1,
        },
      },
    ]);
  }
  async getLatestMessages(conversationId: string, limit: number) {
    return this._messageModel.aggregate([
      { $match: { conversation: new mongoose.Types.ObjectId(conversationId) } },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      { $sort: { createdAt: 1 } },
    ]);
  }

  async getOlderMessages(
    conversationId: string,
    lastMessageId: string,
    limit: number,
  ) {
    return this._messageModel.aggregate([
      {
        $match: {
          conversation: new mongoose.Types.ObjectId(conversationId),
          _id: { $lt: new mongoose.Types.ObjectId(lastMessageId) },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: limit },
      { $sort: { createdAt: 1 } },
    ]);
  }
}
