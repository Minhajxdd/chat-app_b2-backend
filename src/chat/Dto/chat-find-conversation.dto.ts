import { IsNotEmpty, IsString } from "class-validator";

export class ChatFindConversaton {
    @IsNotEmpty()
    @IsString()
    otherUserId: string;
}