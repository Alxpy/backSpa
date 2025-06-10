// src/models/service/IService.ts
import mongoose, { Document } from 'mongoose';

export interface IService extends Document {
  name: string;
  description: string;
  price: number;
  duration: number; // Duración en minutos
  image: string; // URL de la imagen del servicio
  category: 'belleza' | 'relajacion' | 'salud' | 'otro';
  owner_id: mongoose.Types.ObjectId; // ID del propietario del servicio
  isActive: boolean;
}