import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ChatHttpGroupService } from '../Services/chat-http-group.service';
import { ChatCreateGroupDto } from '../Dto/chat-create-group.dto';
import { AuthGuard } from 'src/guards/auth.guards';

@UseGuards(AuthGuard)
@Controller('chat/group')
export class ChatGroupController {
  constructor(private readonly _chatHttpGroupService: ChatHttpGroupService) {}

  @Post()
  createGroup(@Request() req, @Body() data: ChatCreateGroupDto) {
    const userId = String(req.user.userId);

    return this._chatHttpGroupService.createGroup(data, userId);
  }
}
