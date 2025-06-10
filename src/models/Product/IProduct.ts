import mongoose from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  stock: number;
  status: boolean;
  supplier: mongoose.Types.ObjectId;
  owner_id: mongoose.Types.ObjectId;
}