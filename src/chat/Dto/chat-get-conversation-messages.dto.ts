import { IsNotEmpty, IsString } from "class-validator";

export class ChatGetConversationMessageDto {
  
  @IsString()
  @IsNotEmpty()
  conversationId: string;
}
