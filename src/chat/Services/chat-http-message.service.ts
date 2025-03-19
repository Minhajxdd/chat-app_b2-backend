import { Injectable } from '@nestjs/common';

import { MessageRepository } from '../Database/Repositories/message.repository';

@Injectable()
export class ChatHttpMessageService {
  constructor(private readonly _messageRepository: MessageRepository) {}

  async getConversationMessage(conversationId: string) {
    const LIMIT = 2;

    const data = await this._messageRepository.getConversationsMessage(
      conversationId,
      LIMIT,
    );

    console.log(data);
  }
}
