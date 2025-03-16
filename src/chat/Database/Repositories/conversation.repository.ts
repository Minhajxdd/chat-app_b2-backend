import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { Conversation } from '../Schemas/conversation.schema';

@Injectable()
export class ConversationRepository extends GenericRepository<Conversation> {
  constructor(
    @InjectModel(Conversation.name)
    private _conversationModel: Model<Conversation>,
  ) {
    super(_conversationModel);
  }
}
