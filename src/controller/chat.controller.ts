import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ChatService } from '../service/chat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GetChatDTO } from '../dto/get_chat.dto';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChatMessages(@Query() query: GetChatDTO): Promise<any> {
    const chat = await this.chatService.findByUserId(query);
    return chat;
  }
}
