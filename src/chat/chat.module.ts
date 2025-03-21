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
import { ChatDetailsRepository } from './Database/Repositories/chat-details.repository';
import { ChatHttpService } from './Services/chat-http.service';
import {
  RequestChat,
  RequestChatSchema,
} from './Database/Schemas/request-chat.schmea';
import { RequestChatRepository } from './Database/Repositories/request-chat.repository';
import {
  ChatGroup,
  ChatGroupSchema,
} from './Database/Schemas/chat-group.schmea';
import { ChatHttpRequestService } from './Services/chat-http-request.service';
import { ChatHttpMessageService } from './Services/chat-http-message.service';
import { ChatGroupController } from './Controllers/chat-group-controller';
import { ChatHttpGroupService } from './Services/chat-http-group.service';
import { ChatGroupRepository } from './Database/Repositories/chat-group.repository';

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
      {
        name: RequestChat.name,
        schema: RequestChatSchema,
      },
      {
        name: ChatGroup.name,
        schema: ChatGroupSchema,
      },
    ]),
    AuthModule,
  ],
  controllers: [ChatController, ChatGroupController],
  providers: [
    ChatService,
    ChatGateway,
    UserOnlineCache,
    ConversationParticipantsRepository,
    ConversationRepository,
    MessageRepository,
    BuildMessageUtils,
    ChatDetailsRepository,
    ChatHttpService,
    RequestChatRepository,
    ChatHttpRequestService,
    ChatHttpMessageService,
    ChatHttpGroupService,
    ChatGroupRepository
  ],
})
export class ChatModule {}
