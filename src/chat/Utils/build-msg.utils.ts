import { Injectable } from '@nestjs/common';

@Injectable()
export class BuildMessageUtils {
  buildMsg(userId: string, text: string) {
    return {
      senderId: userId,
      text,
      time: new Intl.DateTimeFormat('default', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      }).format(new Date()),
    };
  }
}
