import mongoose from 'mongoose';
import { MONGO_URI } from '../config';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Conexión exitosa a MongoDB');
  } catch (error) {
    console.error('Error en conexión a MongoDB:', error);
    throw error;
  }
};