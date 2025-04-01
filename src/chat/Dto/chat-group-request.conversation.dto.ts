import { IsNotEmpty, IsString } from "class-validator";

export class ChatGroupRequestConversationDto {
    @IsNotEmpty()
    @IsString()
    otherUserId: string;

    @IsString()
    conversationId?: string;
}