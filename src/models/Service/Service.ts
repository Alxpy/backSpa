import { Schema, model } from "mongoose";
import { IService } from "./IService";

const serviceSchema = new Schema<IService>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // Duración en minutos
  image: { type: String, default: null }, // URL de la imagen del servicio
  category: {
    type: String,
    // enum: ['belleza', 'relajacion', 'salud', 'otro'],
    required: true,
  },
  owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ID del propietario del servicio
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export default model<IService>("Service", serviceSchema);