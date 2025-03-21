import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { ChatGroup } from '../Schemas/chat-group.schmea';

@Injectable()
export class ChatGroupRepository extends GenericRepository<ChatGroup> {
  constructor(
    @InjectModel(ChatGroup.name)
    private _chatGroupModel: Model<ChatGroup>,
  ) {
    super(_chatGroupModel);
  }
}
