import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Message } from '../model/message.model';

import { MessageDTO } from '../dto/message.dto'


@Injectable()
export class MessageService {
  constructor(@InjectModel('Message') private messageModel: Model<Message>) {}

  async saveMessage(msg: MessageDTO): Promise<void> {
    const message = new this.messageModel(msg);
    await message.save();
  }
 
  async findByChatId(chatId: string): Promise<Message[]> {
    return this.messageModel
      .find({ chatId: chatId })
      .sort({ createdAt: -1 })
      .limit(10)
      .exec();
  }
}
