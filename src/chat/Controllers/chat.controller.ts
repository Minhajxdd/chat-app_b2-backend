import { BadGatewayException, Controller, Get, Query } from '@nestjs/common';
import { ChatService } from '../Services/chat.service';
import { ChatHttpService } from '../Services/chat-http.service';

@Controller('chat')
export class ChatController {
  constructor(private readonly _chatHttpService: ChatHttpService) {}

  @Get('search-users')
  async searchUsers(
    @Query('name') name?: string, 
    @Query('limit') limit?: string
  ) {
    if (name) {
      return this._chatHttpService.searchByFullName(name, limit);
    }

    return {
      status: 'failed',
      message: 'no user found'
    }
  }
}
