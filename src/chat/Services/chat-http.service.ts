import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from 'src/auth/Database/Repository/user.repository';
import { ConversationParticipantsRepository } from '../Database/Repositories/conversation-participant.repository';
import { RequestChatRepository } from '../Database/Repositories/request-chat.repository';
import mongoose from 'mongoose';
import { ConversationType } from '../Types/database-schmea.models';

@Injectable()
export class ChatHttpService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository,
    private readonly _requestChatRepository: RequestChatRepository,
  ) {}

  async searchByFullName(userId: string, name: string, limit?: string) {
    const limitCount = Number(limit) || 2;

    const data = await this._userRepository.findByFullName(
      userId,
      name,
      limitCount,
    );

    return {
      status: 'success',
      message: 'successfully fetched data',
      data,
    };
  }

  async findConversation(currentUserId: string, otherUserId: string) {
    if (currentUserId == otherUserId) {
      throw new BadRequestException('Invalid Request');
    }

    const data =
      await this._conversationParticipantsRepository.findSingleConversation(
        currentUserId,
        otherUserId,
      );

    return {
      status: 'success',
      message: 'successfully checked for conversation',
      data,
    };
  }

  async requestConversation(currentUserId: string, otherUserId: string) {
    try {
      if (currentUserId == otherUserId) {
        throw new BadRequestException('Invalid Request');
      }

      await this._requestChatRepository.create({
        requestedBy: new mongoose.Types.ObjectId(currentUserId),
        requestedTo: new mongoose.Types.ObjectId(otherUserId),
        type: ConversationType.SINGLE,
      });

      // Implement Notification

      return {
        status: 'success',
        message: 'successfully sent request',
      };
    } catch (err) {
      console.log(`Error while request conversation`);
      throw new InternalServerErrorException();
    }
  }

  async getChatRequests(userId: string) {
    try {
      const LIMIT = 3;
      const requests = await this._requestChatRepository.findRequestsByUserId(
        userId,
        LIMIT,
      );

      return {
        status: 'success',
        message: 'successfully fetched data',
        data: requests,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
