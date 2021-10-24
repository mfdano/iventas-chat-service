import { OutgoingMessageDTO } from "./outgoing_message.dto";
import { UserDTO } from "./user.dto";

export class ChatDTO {
  id: string;
  messages: OutgoingMessageDTO[];
  users: UserDTO[];

  constructor(id: string, messages: OutgoingMessageDTO[], users:  UserDTO[]) {
    this.id = id;
    this.messages = messages;
    this.users = users;
  }
}
