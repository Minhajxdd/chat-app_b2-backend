import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildMessageUtils {
  buildMsg(conversation: string, sender: string, text: string) {
    return {
      sender,
      conversation,
      text,
      time: new Date(),
    };
  }
}
