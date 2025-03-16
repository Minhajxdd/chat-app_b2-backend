import { Module } from '@nestjs/common';
import { ChatService } from './Services/chat.service';
import { ChatController } from './Controllers/chat.controller';
import { ChatGateway } from './Gateway/chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}
