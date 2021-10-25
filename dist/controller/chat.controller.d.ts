import { ChatService } from '../service/chat.service';
import { GetChatDTO } from '../dto/get_chat.dto';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    getChatMessages(query: GetChatDTO): Promise<any>;
}
