export class IncomingMessageDTO {
  chatId: string;
  senderId: string;
  content: string;
  sentDate: number;

  constructor(chatId: string, senderId: string, content: string, sentDate: number) {
    this.chatId = chatId;
    this.senderId = senderId;
    this.content = content;
    this.sentDate = sentDate;
  }
}
