import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { ChatCreateGroupDto } from '../Dto/chat-create-group.dto';
import { ConversationRepository } from '../Database/Repositories/conversation.repository';
import { ConversationType } from '../Types/database-schmea.models';
import { ChatGroupRepository } from '../Database/Repositories/chat-group.repository';
import mongoose from 'mongoose';
import { ConversationParticipantsRepository } from '../Database/Repositories/conversation-participant.repository';

@Injectable()
export class ChatHttpGroupService {
  constructor(
    private readonly _conversationRepository: ConversationRepository,
    private readonly _chatGroupRepository: ChatGroupRepository,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository,
  ) {}

  async createGroup(data: ChatCreateGroupDto, userId: string) {
    const { title, description } = data;

    const isAlreadyGroupWithSameName = await this._chatGroupRepository.findOne({
      title,
    });

    if (isAlreadyGroupWithSameName) {
      throw new BadRequestException('Title Is Not Available');
    }

    const newConversations = await this._conversationRepository.create({
      type: ConversationType.GROUP,
    });

    await this._conversationParticipantsRepository.create({
      conversation: new mongoose.Types.ObjectId(String(newConversations._id)),
      user: new mongoose.Types.ObjectId(String(userId)),
    });

    const newGroup = await this._chatGroupRepository.create({
      conversation: new mongoose.Types.ObjectId(String(newConversations._id)),
      title,
      description,
      admins: [new mongoose.Types.ObjectId(String(userId))],
    });

    return {
      status: 'success',
      message: 'successfully group created',
    };
  }

  async findConversation(
    currentUserId: string,
    otherUserId: string,
    conversationId: string,
  ) {
    if (currentUserId == otherUserId) {
      throw new BadRequestException('Invalid Request');
    }

    const data =
      await this._conversationParticipantsRepository.findConversationWithType(
        currentUserId,
        otherUserId,
        'group',
        conversationId,
      );

    return {
      status: 'success',
      message: 'successfully checked for conversation',
      data,
    };
  }
}
