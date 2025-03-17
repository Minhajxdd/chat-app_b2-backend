import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/Database/Repository/user.repository';
import { ConversationParticipantsRepository } from '../Database/Repositories/conversation-participant.repository';

@Injectable()
export class ChatHttpService {
  constructor(
    @Inject('UserRepository')
    private readonly _userRepository: UserRepository,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository
  ) {}

  async searchByFullName(userId: string, name: string, limit?: string) {
    const limitCount = Number(limit) || 2;

    const data = await this._userRepository.findByFullName(userId, name, limitCount);

    return {
      status: 'success',
      message: 'successfully fetched data',
      data,
    };
  }

  async findConversation(currentUserId: string, otherUserId: string) {
    const data = await this._conversationParticipantsRepository.findSingleConversation(currentUserId, otherUserId);
  
    console.log(data);



  }
}
