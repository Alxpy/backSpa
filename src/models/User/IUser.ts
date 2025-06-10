// src/models/user/IUser.ts (Interface)
import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  document: string;
  role: 'user' | 'admin';
  pets: mongoose.Types.ObjectId[];
}