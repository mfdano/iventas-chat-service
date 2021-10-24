export class GetMessagesDTO {
  chatId: string;
  lastDate: number;
  limit: number;

  constructor(chatId: string, lastDate: number, limit: number) {
    this.chatId = chatId;
    this.lastDate = lastDate;
    this.limit = limit;
  }
}
