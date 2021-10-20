import { Controller, Get, Request, UseGuards  } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getChatMessages(@Request() req): void {
    return req.user;
  }
}
