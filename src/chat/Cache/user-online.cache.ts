import { BadRequestException, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import configuration from 'src/config/configuration';

@Injectable()
export class UserOnlineCache {
  private readonly _redis: Redis;

  constructor() {
    const redisConfiguration = {
      host: configuration().redisConfiguration.host,
      port: configuration().redisConfiguration.port,
    };

    this._redis = new Redis(redisConfiguration);
  }

  async addUser(clientId: string, userId: string): Promise<void> {
    await this._redis.set(`clientId:${clientId}`, userId);
    await this._redis.set(`userId:${userId}`, clientId);
  }

  async removeWithClientId(clientId: string): Promise<void> {
    const value = await this._redis.get(`clientId:${clientId}`);
    if (!value) {
      throw new BadRequestException();
    }

    await this._redis.del(`clientId:${clientId}`);
    await this._redis.del(`userId:${value}`);
  }

  async hasWithUserId(userId: string): Promise<boolean> {
    return (await this._redis.exists(`userId:${userId}`)) === 1;
  }
}
