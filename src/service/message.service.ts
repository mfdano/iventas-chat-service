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

  async saveMessage(msg: IncomingMessageDTO): Promise<OutgoingMessageDTO> {
    console.log(msg.content)
    let message = new this.messageModel(msg);
    message = await message.save();
    return this.toDTO(message, false);
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
        this.toDTO(messages[idx],
        messages[idx].senderId !== messages[idx + 1].senderId)
      )
    }

    if (messages.length === 1) {
      outgoingMessages.push( this.toDTO(messages[0], true))
    } else if (outgoingMessages.length < query.limit && outgoingMessages.length > 0) {
      outgoingMessages.push( this.toDTO(messages[messages.length - 1], true))
      outgoingMessages[outgoingMessages.length - 1].isFirst = true;
    }

    return outgoingMessages;
  }

  private toDTO(message: Message, isFirst: boolean): OutgoingMessageDTO {
    return new OutgoingMessageDTO(
      message.id, message.chatId,message.senderId, message.content, message.sentDate, isFirst
    )
  }
}
