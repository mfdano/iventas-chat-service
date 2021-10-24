export class GetChatDTO {
  userId: string;
  lastDate: number;
  limit: number;

  constructor(userId: string, lastDate: number, limit: number) {
    this.userId = userId;
    this.lastDate = lastDate;
    this.limit = limit;
  }
}
