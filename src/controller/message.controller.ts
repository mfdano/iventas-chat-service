import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { OutgoingMessageDTO } from '../dto/outgoing_message.dto';
import { GetMessagesDTO } from 'src/dto/get_messages.dto';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getChatMessages(@Query() query: GetMessagesDTO): Promise<OutgoingMessageDTO[]> {
    const messages = await this.messageService.findByChatId(query);
    return messages;
  }
}
