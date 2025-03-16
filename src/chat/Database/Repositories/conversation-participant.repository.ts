import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { GenericRepository } from './generic.repository';
import { ConversationParticipant } from '../Schemas/conversation-participant.schema';

@Injectable()
export class ConversationParticipantsRepository extends GenericRepository<ConversationParticipant> {
  constructor(
    @InjectModel(ConversationParticipant.name)
    private _conversationParticipantModel: Model<ConversationParticipant>,
  ) {
    super(_conversationParticipantModel);
  }

  async getUserGroupConversations(userId: string) {
    return await this._conversationParticipantModel.aggregate([
      {
        $match: { user: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'conversations',
          localField: 'conversation',
          foreignField: '_id',
          as: 'conversationDetails',
        },
      },
      {
        $unwind: '$conversationDetails',
      },
      {
        $match: { 'conversationDetails.type': 'group' },
      },
      {
        $replaceRoot: { newRoot: '$conversationDetails' },
      },
    ]).exec();
  }
  
}
