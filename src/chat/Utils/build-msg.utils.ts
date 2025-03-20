import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildMessageUtils {
  buildMsg(conversation: string, sender: string, text: string) {
    return {
      sender,
      conversation,
      content: text,
      createdAt: new Date(),
    };
  }
}

export interface ChatMessageModel {
  content: string;
  conversation: string;
  createdAt: string;
  file?: null;
  messageType: string;
  sender: string;
  updatedAt?: string;
  __v?: number;
  _id?: string;
}