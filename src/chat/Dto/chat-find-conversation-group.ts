import { IsNotEmpty, IsString } from 'class-validator';

export class ChatFindConversatonGroup {
  @IsNotEmpty()
  @IsString()
  otherUserId: string;

  @IsNotEmpty()
  @IsString()
  conversationId: string;
}
