import { Schema, model } from "mongoose";
import { ISupplier } from "./ISupplier";

const supplierSchema = new Schema<ISupplier>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    phone: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

export default model<ISupplier>("Supplier", supplierSchema);