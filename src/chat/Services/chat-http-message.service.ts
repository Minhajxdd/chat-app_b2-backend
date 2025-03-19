import { Injectable } from '@nestjs/common';

import { MessageRepository } from '../Database/Repositories/message.repository';

@Injectable()
export class ChatHttpMessageService {
  constructor(private readonly _messageRepository: MessageRepository) {}

  async getConversationMessages(
    conversationId: string,
    page: number,
    limit: number,
  ) {
    const skip = (page - 1) * limit;

    const messages = await this._messageRepository.getConversationsMessage(
      conversationId,
      skip,
      limit,
    );

    return {
      status: 'success',
      message: 'successfully fetched data',
      data: messages,
    };
  }
}
