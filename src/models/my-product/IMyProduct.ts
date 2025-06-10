import mongoose from "mongoose";

export interface IMyProduct {
  id_user?: string;
  id_product?: mongoose.Types.ObjectId[];
  status: boolean
}