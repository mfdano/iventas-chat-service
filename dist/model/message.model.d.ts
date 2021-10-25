import { Schema } from 'mongoose';
export declare const MessageSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
export interface Message {
    id: string;
    chatId: string;
    senderId: string;
    content: string;
    sentDate: number;
}
