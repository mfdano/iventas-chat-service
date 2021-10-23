import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MessageDTO } from 'src/dto/message.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChatMessages(@Query() query): Promise<MessageDTO[]> {
    const messages = await this.messageService.findByChatId(query.chatId);
    return messages.map((message)  => message as MessageDTO);
  }
}
