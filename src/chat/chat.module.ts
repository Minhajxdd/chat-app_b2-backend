import { Module } from '@nestjs/common';
import { ChatService } from './Services/chat.service';
import { ChatController } from './Controllers/chat.controller';
import { ChatGateway } from './Gateway/chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Conversation,
  ConversationSchema,
} from './Database/Schemas/conversation.schema';
import {
  ConversationParticipant,
  ConversationParticipantSchema,
} from './Database/Schemas/conversation-participant.schema';
import { Message, MessageSchema } from './Database/Schemas/message.schema';
import { File, FileSchema } from './Database/Schemas/file.schema';
import { UserOnlineCache } from './Cache/user-online.cache';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Conversation.name,
        schema: ConversationSchema,
      },
      {
        name: ConversationParticipant.name,
        schema: ConversationParticipantSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, UserOnlineCache],
})
export class ChatModule {}
