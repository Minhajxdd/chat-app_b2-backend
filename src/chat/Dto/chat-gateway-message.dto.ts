import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ConversationType } from '../Types/database-schmea.models';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  conversation: string;

  @IsString()
  userId?: string;

  @IsString()
  @IsEnum(ConversationType, { message: 'must be a valid type' })
  messageType: ConversationType;
}