import { OutgoingMessageDTO } from "./outgoing_message.dto";
import { UserDTO } from "./user.dto";
export declare class ChatDTO {
    id: string;
    messages: OutgoingMessageDTO[];
    users: UserDTO[];
    constructor(id: string, messages: OutgoingMessageDTO[], users: UserDTO[]);
}
