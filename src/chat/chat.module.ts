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
import { ConversationParticipantsRepository } from './Database/Repositories/conversation-participant.repository';
import { ConversationRepository } from './Database/Repositories/conversation.repository';
import { MessageRepository } from './Database/Repositories/message.repository';
import { BuildMessageUtils } from './Utils/build-msg.utils';
import { AuthModule } from 'src/auth/auth.module';

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
    AuthModule,
  ],
  controllers: [ChatController],
  providers: [
    ChatService,
    ChatGateway,
    UserOnlineCache,
    ConversationParticipantsRepository,
    ConversationRepository,
    MessageRepository,
    BuildMessageUtils,
  ],
})
export class ChatModule {}
