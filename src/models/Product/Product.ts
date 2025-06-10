import { Schema, model } from "mongoose";
import { IProduct } from "./IProduct";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, required: false },
    status: { type: Boolean, default: true },
    stock: { type: Number, required: true, default: 0 },
    supplier: { type: Schema.Types.ObjectId, ref: "Supplier", required: true },
    owner_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IProduct>("Product", productSchema);
