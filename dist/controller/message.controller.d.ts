import { MessageService } from '../service/message.service';
import { OutgoingMessageDTO } from '../dto/outgoing_message.dto';
import { GetMessagesDTO } from 'src/dto/get_messages.dto';
export declare class MessageController {
    private readonly messageService;
    constructor(messageService: MessageService);
    getChatMessages(query: GetMessagesDTO): Promise<OutgoingMessageDTO[]>;
}
