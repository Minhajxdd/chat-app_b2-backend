import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildMessageUtils {
  buildMsg(conversation: string, text: string) {
    return {
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
