import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from '../model/message.model';

import { IncomingMessageDTO } from '../dto/incoming_message.dto';
import { GetMessagesDTO } from '../dto/get_messages.dto';
import { OutgoingMessageDTO } from 'src/dto/outgoing_message.dto';


@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async saveMessage(msg: IncomingMessageDTO): Promise<void> {
    const message = new this.messageModel(msg);
    await message.save();
  }
 
  async findByChatId(query: GetMessagesDTO): Promise<OutgoingMessageDTO[]> {
    const outgoingMessages = []
    const messages = await this.messageModel
      .find({ chatId: query.chatId, sentDate: { $lt: Number(query.lastDate) } })
      .sort({ sentDate: -1 })
      .limit(Number(query.limit) + 1)
      .exec();

    for (let idx = 0; idx < messages.length - 1; idx++) {
      outgoingMessages.push(
        new OutgoingMessageDTO(
          messages[idx].id, messages[idx].chatId, messages[idx].senderId, messages[idx].content,
          messages[idx].sentDate, messages[idx].senderId !== messages[idx + 1].senderId)
        )
    }

    if (outgoingMessages.length < query.limit && outgoingMessages.length > 0) {
      outgoingMessages.push( new OutgoingMessageDTO(
        messages[messages.length - 1].id, messages[messages.length - 1].chatId, messages[messages.length - 1].senderId,
        messages[messages.length - 1].content, messages[messages.length - 1].sentDate, true)
      );
      outgoingMessages[outgoingMessages.length - 1].isFirst = true;
    }
    
    return outgoingMessages;
  }
}
