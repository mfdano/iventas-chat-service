import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  userIds: [String],
});

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
}