import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildMessageUtils {
  buildMsg(conversation: string, sender: string,text: string) {
    return {
      sender,
      conversation,
      text,
      time: new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date()),
    };
  }
}
