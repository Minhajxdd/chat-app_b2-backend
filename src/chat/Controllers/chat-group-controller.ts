import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatHttpGroupService } from '../Services/chat-http-group.service';
import { ChatCreateGroupDto } from '../Dto/chat-create-group.dto';
import { AuthGuard } from 'src/guards/auth.guards';
import { ChatFindConversaton } from '../Dto/chat-find-conversation.dto';
import { ChatFindConversatonGroup } from '../Dto/chat-find-conversation-group';

@UseGuards(AuthGuard)
@Controller('chat/group')
export class ChatGroupController {
  constructor(private readonly _chatHttpGroupService: ChatHttpGroupService) {}

  @Post()
  createGroup(@Request() req, @Body() data: ChatCreateGroupDto) {
    const userId = String(req.user.userId);

    return this._chatHttpGroupService.createGroup(data, userId);
  }

  @Post('find-conversation')
  findConversation(@Request() req, @Body() data: ChatFindConversatonGroup) {
    const userId = String(req.user.userId);
    const { otherUserId, conversationId } = data;

    return this._chatHttpGroupService.findConversation(userId, otherUserId, conversationId);
  }
}
