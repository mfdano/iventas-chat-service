import { Model } from 'mongoose';
import { Message } from '../model/message.model';
import { IncomingMessageDTO } from '../dto/incoming_message.dto';
import { GetMessagesDTO } from '../dto/get_messages.dto';
import { OutgoingMessageDTO } from 'src/dto/outgoing_message.dto';
export declare class MessageService {
    private messageModel;
    constructor(messageModel: Model<Message>);
    saveMessage(msg: IncomingMessageDTO): Promise<OutgoingMessageDTO>;
    findByChatId(query: GetMessagesDTO): Promise<OutgoingMessageDTO[]>;
    private toDTO;
}
