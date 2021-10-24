export class OutgoingMessageDTO {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  sentDate: number;
  isFirst: boolean;

  constructor(id: string, chatId: string, senderId: string, content: string, sentDate: number, isFirst: boolean) {
    this.id = id;
    this.chatId = chatId;
    this.senderId = senderId;
    this.content = content;
    this.sentDate = sentDate;
    this.isFirst = isFirst;
  }
}
