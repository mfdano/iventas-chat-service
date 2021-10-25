import { Schema } from 'mongoose';
export declare const ChatSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
export interface Chat {
    id: string;
    userIds: string[];
}
