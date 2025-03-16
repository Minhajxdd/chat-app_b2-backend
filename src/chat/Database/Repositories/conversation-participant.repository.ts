import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
