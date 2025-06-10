// src/models/pet/IPet.ts
import mongoose, { Document } from 'mongoose';

export interface IPet extends Document {
  name: string;
  species: 'perro' | 'gato' | 'otro';
  breed: string;
  age: number;
  weight: number;
  note?: string;
  image?: string;
  owner: mongoose.Types.ObjectId;
}