import { Injectable } from '@nestjs/common';

import { MessageRepository } from '../Database/Repositories/message.repository';

@Injectable()
export class ChatHttpMessageService {
  constructor(private readonly _messageRepository: MessageRepository) {}

  async getConversationMessages(conversationId: string, lastMessageId: string | null, limit: number) {
    let messages;
  
    if (!lastMessageId) {
      
      messages = await this._messageRepository.getLatestMessages(conversationId, limit);
    } else {
      messages = await this._messageRepository.getOlderMessages(conversationId, lastMessageId, limit);
    }
  
    return {
      status: 'success',
      message: 'Successfully fetched data',
      data: messages,
      remaining: messages.length === limit,
    };
  }
  
  
}
