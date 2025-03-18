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
import { RequestActionsDto } from '../Dto/request-actions.dto';
import { ConversationRepository } from '../Database/Repositories/conversation.repository';

@Injectable()
export class ChatHttpService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository,
    private readonly _requestChatRepository: RequestChatRepository,
    private readonly _conversationRepository: ConversationRepository,
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

  async acceptRequests(userId: string, data: RequestActionsDto) {
    try {
      const { action, requestId } = data;

      const request = await this._requestChatRepository.findRequestAndDelete(
        userId,
        requestId,
      );

      if (!request) {
        throw new BadRequestException();
      }

      if (action === 'reject') {
        return {
          status: 'success',
          message: 'Successfully rejected request',
        };
      }

      const newConversation = await this._conversationRepository.create({
        type: request.type,
      });

      let { _id: newConversationId } = newConversation;

      await this._conversationParticipantsRepository.create({
        conversation: new mongoose.Types.ObjectId(String(newConversationId)),
        user: request.requestedBy,
      });

      await this._conversationParticipantsRepository.create({
        conversation: new mongoose.Types.ObjectId(String(newConversationId)),
        user: request.requestedTo,
      });

      return {
        status: 'success',
        message: 'successfull added conversation',
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }

  async getConversations(userId: string) {
    try {
      const data: any =
        await this._conversationParticipantsRepository.getConversationWithUserId(
          userId,
        );

      return {
        status: 'success',
        message: 'successfully fetched data',
        data,
      };
    } catch (err) {
      console.log(err);
      throw new InternalServerErrorException();
    }
  }
}
