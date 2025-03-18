import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { RequestChat } from '../Schemas/request-chat.schmea';

@Injectable()
export class RequestChatRepository extends GenericRepository<RequestChat> {
  constructor(
    @InjectModel(RequestChat.name)
    private _requestChatModel: Model<RequestChat>,
  ) {
    super(_requestChatModel);
  }

  findRequestsByUserId(userId: string, limit: number) {
    return this._requestChatModel
      .find({
        requestedTo: new mongoose.Types.ObjectId(userId),
      })
      .populate({
        path: "requestedBy",
        select: "fullName email",
      })
      .limit(limit);
  }
}
