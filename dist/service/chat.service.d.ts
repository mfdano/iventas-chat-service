import { Model } from 'mongoose';
import { GetChatDTO } from '../dto/get_chat.dto';
import { ChatDTO } from '../dto/chat.dto';
import { Chat } from '../model/chat.model';
import { MessageService } from './message.service';
import { UserService } from './user.service';
export declare class ChatService {
    private chatModel;
    private readonly messageService;
    private readonly userService;
    constructor(chatModel: Model<Chat>, messageService: MessageService, userService: UserService);
    findByUserId(query: GetChatDTO): Promise<ChatDTO>;
}
