import { RefreshToken } from '../../Database/Schemea/refresh-token.schema';
import { IGenericRepository } from './generic-repository.interface';

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IRefreshTokenRepository
  extends IGenericRepository<RefreshToken> {
  updateOneUpsert(token: string, userId: string): Promise<void>;
}
