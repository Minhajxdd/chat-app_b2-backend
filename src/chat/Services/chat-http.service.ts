import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from 'src/auth/Database/Repository/user.repository';
import { ConversationParticipantsRepository } from '../Database/Repositories/conversation-participant.repository';

@Injectable()
export class ChatHttpService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository,
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
      await this._conversationParticipantsRepository.findConversationWithType(
        currentUserId,
        otherUserId,
        'single'
      );

    return {
      status: 'success',
      message: 'successfully checked for conversation',
      data,
    };
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
