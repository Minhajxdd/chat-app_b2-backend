import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
