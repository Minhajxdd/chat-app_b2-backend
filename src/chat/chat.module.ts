import { Module } from '@nestjs/common';
import { ChatService } from './Services/chat.service';
import { ChatController } from './Controllers/chat.controller';

@Module({
  controllers: [ChatController],
  providers: [ChatService],
})
export class ChatModule {}
