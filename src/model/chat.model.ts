import { Schema } from 'mongoose';

export const ChatSchema = new Schema({
  userIds: [String],
});

export interface Chat {
  id: string;
  userIds: string[];
}