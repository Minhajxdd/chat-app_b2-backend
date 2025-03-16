import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { Server } from 'socket.io';

import configuration from 'src/config/configuration';

@Injectable()
export class ChatService {
  private readonly _pub: Redis;
  private readonly _sub: Redis;

  private server: Server;

  constructor() {
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
}
