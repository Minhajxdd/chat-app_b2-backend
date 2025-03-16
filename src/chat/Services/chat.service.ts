import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Server, Socket } from 'socket.io';

import configuration from 'src/config/configuration';
import { UserOnlineCache } from '../Cache/user-online.cache';

@Injectable()
export class ChatService {
  private readonly _pub: Redis;
  private readonly _sub: Redis;

  private server: Server;

  constructor(
    private readonly _userOnlineCache: UserOnlineCache
  ) {
    const redisConfiguration = {
      host: configuration().redisConfiguration.host,
      port: configuration().redisConfiguration.port,
    };

    this._pub = new Redis(redisConfiguration);
    this._sub = new Redis(redisConfiguration);
  }

  setServer(server: Server): void {
    this.server = server;
  }


  async enterRoom(client: Socket, userId: string) {
    
    await this._userOnlineCache.addUser(client.id, userId);
    
    

  }
}
