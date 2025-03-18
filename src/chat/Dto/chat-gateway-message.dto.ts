import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ConversationType } from '../Types/database-schmea.models';

export class MessageDto {
  @IsString()
  @IsNotEmpty()
  text: string;

  @IsString()
  @IsNotEmpty()
  conversationId: string;

  @IsString()
  userId?: string;

  @IsString()
  @IsEnum(ConversationType, { message: 'must be a valid type' })
  type: ConversationType;
}
