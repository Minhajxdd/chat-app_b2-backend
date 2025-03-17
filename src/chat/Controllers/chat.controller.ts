import {
  BadGatewayException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ChatHttpService } from '../Services/chat-http.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { ChatFindConversaton } from '../Dto/chat-find-conversation.dto';

@UseGuards(AuthGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly _chatHttpService: ChatHttpService) {}

  @Get('search-users')
  async searchUsers(
    @Request() req,
    @Query('name') name?: string,
    @Query('limit') limit?: string,
  ) {
    const userId = String(req.user.userId);
    if (name) {
      return this._chatHttpService.searchByFullName(userId, name, limit);
    }

    return {
      status: 'failed',
      message: 'no user found',
    };
  }

  @Post('find-conversation')
  findConversation(@Request() req, @Body() data: ChatFindConversaton) {
    const userId = String(req.user.userId);
    const { otherUserId } = data;

    return this._chatHttpService.findConversation(userId, otherUserId);
  }
}
