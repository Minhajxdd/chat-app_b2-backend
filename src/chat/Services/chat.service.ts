import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';

import configuration from 'src/config/configuration';
import { UserOnlineCache } from '../Cache/user-online.cache';
import { ConversationParticipantsRepository } from '../Database/Repositories/conversation-participant.repository';
import { BuildMessageUtils } from '../Utils/build-msg.utils';
import { MessageDto } from '../Dto/chat-gateway-message.dto';
import { MessageRepository } from '../Database/Repositories/message.repository';
import mongoose from 'mongoose';
import { MessageType } from '../Types/database-schmea.models';

@Injectable()
export class ChatService {
  private readonly _pub: Redis;
  private readonly _sub: Redis;

  private server: Server;

  constructor(
    private readonly _userOnlineCache: UserOnlineCache,
    private readonly _conversationParticipantsRepository: ConversationParticipantsRepository,
    private readonly _buildMessageUtils: BuildMessageUtils,
    private readonly _messageRepository: MessageRepository,
  ) {
    const redisConfiguration = {
      host: configuration().redisConfiguration.host,
      port: configuration().redisConfiguration.port,
    };

    this._pub = new Redis(redisConfiguration);
    this._sub = new Redis(redisConfiguration);

    this._sub.subscribe('chatEvent', (err) => {
      if (err) console.error('Error subscribing to chatEvent:', err);
    });

    this._sub.on('message', (channel, message) => {
      if (channel === 'chatEvent') {
        const { event, room, data } = JSON.parse(message);

        if (event === 'message') {
          this.server?.to(room).emit('message', { data });
        }  
        else if (event === 'message-room') {
          this.server?.to(room).emit('message', { data });
        }
        else if (event === 'edit-message') {
          this.server?.to(room).emit('edit-message', data);
        } else if (event === 'delete-message') {
          this.server?.to(room).emit('delete-message', data);
        } else if (event === 'activity') {
          this.server?.to(room).emit('activity', data);
        }
      }
    });
  }

  setServer(server: Server): void {
    this.server = server;
  }

  async enterRoom(client: Socket, userId: string) {
    await this._userOnlineCache.addUser(client.id, userId);

    client.join(userId);

    const groups =
      await this._conversationParticipantsRepository.getUserGroupConversations(
        userId,
      );

    if(groups) {
      groups.forEach((group) => {
        client.join(String(group._id));
      })
    }
    

    //Will Implement Later
  }

  async message(client: Socket, data: MessageDto, userId: string) {
    const { content, conversation, messageType } = data;

    const buildedMessage = this._buildMessageUtils.buildMsg(
      conversation,
      userId,
      content,
    );

    if (messageType === 'single') {
      if (!data.userId) {
        throw new BadRequestException();
      }

      // Temporory storing will update will more robost techiniques sooner
      await this._messageRepository.create({
        conversation: new mongoose.Types.ObjectId(conversation),
        sender: new mongoose.Types.ObjectId(userId),
        messageType: MessageType.TEXT,
        content,
      });

      this._pub.publish(
        'chatEvent',
        JSON.stringify({
          event: 'message',
          room: data.userId,
          data: buildedMessage,
        }),
      );
    } else if (messageType === 'group') {

      // Temporory storing will update will more robost techiniques sooner
      await this._messageRepository.create({
        conversation: new mongoose.Types.ObjectId(conversation),
        sender: new mongoose.Types.ObjectId(userId),
        messageType: MessageType.TEXT,
        content,
      });

      this._pub.publish(
        'chatEvent',
        JSON.stringify({
          event: 'message-room',
          room: conversation,
          data: buildedMessage,
        }),
      );
    }
  }
}
