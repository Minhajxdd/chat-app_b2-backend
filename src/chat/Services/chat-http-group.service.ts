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

@Injectable()
export class ChatHttpGroupService {
  constructor(
    private readonly _conversationRepository: ConversationRepository,
    private readonly _chatGroupRepository: ChatGroupRepository,
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
}
