import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  name: String,
  phoneNumber: Number,
  imageProfileSRC: String,
  age: Number,
  email: String,
  priority: String,
  problemDescription: String,
  promoDescription: String,
  CURP: String,
  password: String,
  notes: String,
});

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