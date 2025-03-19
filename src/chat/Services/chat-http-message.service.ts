import { Injectable } from '@nestjs/common';
import { ChatGetConversationMessageDto } from '../Dto/chat-get-conversation-messages.dto';
import { MessageRepository } from '../Database/Repositories/message.repository';

@Injectable()
export class ChatHttpMessageService {
  constructor(private readonly _messageRepository: MessageRepository) {}

  async getConversationMessage(data: ChatGetConversationMessageDto) {
    const { conversationId } = data;

    const LIMIT = 2;

    const result = await this._messageRepository.getConversationsMessage(
      conversationId,
      LIMIT,
    );

    console.log(result);
  }
}
