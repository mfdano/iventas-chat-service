import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GetChatDTO } from '../dto/get_chat.dto';
import { GetMessagesDTO } from 'src/dto/get_messages.dto';
import { ChatDTO } from '../dto/chat.dto';
import { UserDTO } from '../dto/user.dto';

import { Chat } from '../model/chat.model';
import { MessageService } from './message.service';
import { UserService } from './user.service';

@Injectable()
export class ChatService {
  constructor(@InjectModel('Chat') private chatModel: Model<Chat>,
  private readonly messageService: MessageService,
  private readonly userService: UserService) {}

  async findByUserId(query: GetChatDTO): Promise<ChatDTO> {
    console.log('query', query.userId )
    const chat = await this.chatModel
      .findOne({ userIds: query.userId })
      .exec();

    const messages = await this.messageService.findByChatId(new GetMessagesDTO(chat.id, query.lastDate, query.limit));
    //console.log(JSON.stringify(messages, null, 2))
    const users = [];

    for await (const _user of chat.userIds.map(async (id) => await this.userService.findOneById(id)))
      users.push(_user);
    
    return new ChatDTO(chat.id,
      messages,
      users.map((user) => new UserDTO(user.id, user.name, user.phoneNumber, user.imageProfileSRC, user.age,
        user.email, user.priority, user.problemDescription, user.promoDescription, user.CURP, user.notes))
    )
  }
}
