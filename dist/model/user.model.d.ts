import { Schema } from 'mongoose';
export declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any>, {}>;
export interface User {
    id: string;
    name: string;
    phoneNumber: number;
    imageProfileSRC: string;
    age: number;
    email: string;
    priority: string;
    problemDescription: string;
    promoDescription: string;
    CURP: string;
    password: string;
    notes: string;
}
