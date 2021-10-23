import { Schema } from 'mongoose';

export const MessageSchema = new Schema({
  chatId: String,
  senderId: String,
  content: String,
  sentDate: Number,
});

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  sentDate: number;
}